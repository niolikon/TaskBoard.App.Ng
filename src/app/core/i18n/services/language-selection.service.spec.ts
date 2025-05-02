import { TestBed } from '@angular/core/testing';
import { LanguageSelectionService } from './language-selection.service';
import { TranslateService } from '@ngx-translate/core';
import { I18N_DEFAULT_LANGUAGE } from '../i18n.config';

describe('LanguageSelectionService', () => {
  let service: LanguageSelectionService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use']);

    TestBed.configureTestingModule({
      providers: [
        LanguageSelectionService,
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    });

    service = TestBed.inject(LanguageSelectionService);
  });

  describe('initial state', () => {
    it('should emit the default language on initialization', (done) => {
      // Arrange
      const expected = I18N_DEFAULT_LANGUAGE;

      // Act & Assert
      service.language$.subscribe(language => {
        expect(language).toBe(expected);
        done();
      });
    });
  });

  describe('setLanguage', () => {
    it('should call translate.use with the given language', () => {
      // Arrange
      const lang = 'fr';

      // Act
      service.setLanguage(lang);

      // Assert
      expect(translateServiceSpy.use).toHaveBeenCalledWith(lang);
    });

    it('should emit the new language to subscribers', (done) => {
      // Arrange
      const lang = 'it';
      const emissions: string[] = [];

      service.language$.subscribe(value => emissions.push(value));

      // Act
      service.setLanguage(lang);

      // Assert
      setTimeout(() => {
        expect(emissions).toEqual([I18N_DEFAULT_LANGUAGE, lang]);
        done();
      }, 0);
    });
  });
});
