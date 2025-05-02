import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureLocalizationLoaderService } from './feature-localization-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { I18N_SUPPORTED_LANGUAGES } from '../i18n.config';
import { of } from 'rxjs';

describe('FeatureLocalizationLoaderService', () => {
  let service: FeatureLocalizationLoaderService;
  let httpMock: HttpTestingController;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['setTranslation']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FeatureLocalizationLoaderService,
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    });

    service = TestBed.inject(FeatureLocalizationLoaderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('preloadFeatureLocalizations', () => {
    it('should preload all supported languages for a given feature and update translateService', () => {
      // Arrange
      const feature = 'dashboard';
      const mockTranslation = { key: 'value' };
      const expectedRequests = I18N_SUPPORTED_LANGUAGES.map(lang =>
        `i18n/features/${feature}/${lang}.json`
      );

      // Act
      service.preloadFeatureLocalizations(feature).subscribe(result => {
        expect(result).toBeUndefined();
      });

      // Assert
      for (const url of expectedRequests) {
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(mockTranslation);
      }

      expect(translateServiceSpy.setTranslation).toHaveBeenCalledTimes(I18N_SUPPORTED_LANGUAGES.length);
      for (const lang of I18N_SUPPORTED_LANGUAGES) {
        expect(translateServiceSpy.setTranslation).toHaveBeenCalledWith(lang, { key: 'value' }, true);
      }
    });

    it('should avoid reloading if feature was already loaded', () => {
      // Arrange
      const feature = 'dashboard';
      service['preloadedFeatures'].add(feature);

      // Act
      service.preloadFeatureLocalizations(feature).subscribe(result => {
        expect(result).toBeUndefined();
      });

      // Assert
      httpMock.expectNone(`i18n/features/${feature}/en.json`);
      expect(translateServiceSpy.setTranslation).not.toHaveBeenCalled();
    });

    it('should recover gracefully from loading errors and still complete', () => {
      // Arrange
      const feature = 'dashboard';

      // Act
      service.preloadFeatureLocalizations(feature).subscribe(result => {
        expect(result).toBeUndefined();
      });

      // Assert
      I18N_SUPPORTED_LANGUAGES.forEach(lang => {
        const req = httpMock.expectOne(`i18n/features/${feature}/${lang}.json`);
        req.flush('error', { status: 404, statusText: 'Not Found' });
      });

      expect(translateServiceSpy.setTranslation).toHaveBeenCalledTimes(I18N_SUPPORTED_LANGUAGES.length);
    });
  });

  describe('preloadCoreLocalizations', () => {
    it('should delegate to preloadFeatureLocalizations with "core"', () => {
      // Arrange
      spyOn(service, 'preloadFeatureLocalizations').and.returnValue(of(undefined));

      // Act
      service.preloadCoreLocalizations().subscribe();

      // Assert
      expect(service.preloadFeatureLocalizations).toHaveBeenCalledWith('core');
    });
  });

  describe('preloadSharedLocalizations', () => {
    it('should delegate to preloadFeatureLocalizations with "shared"', () => {
      // Arrange
      spyOn(service, 'preloadFeatureLocalizations').and.returnValue(of(undefined));

      // Act
      service.preloadSharedLocalizations().subscribe();

      // Assert
      expect(service.preloadFeatureLocalizations).toHaveBeenCalledWith('shared');
    });
  });

  describe('localizationsReady$', () => {
    it('should emit false when loading starts and true when loading completes', () => {
      // Arrange
      const feature = 'settings';
      const values: boolean[] = [];

      service.localizationsReady$.subscribe(val => values.push(val));

      // Act
      service.preloadFeatureLocalizations(feature).subscribe();

      I18N_SUPPORTED_LANGUAGES.forEach(lang => {
        const req = httpMock.expectOne(`i18n/features/${feature}/${lang}.json`);
        req.flush({});
      });

      // Assert
      expect(values).toEqual([true, false, true]);
    });
  });
});
