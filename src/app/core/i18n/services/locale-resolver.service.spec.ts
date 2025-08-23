import { TestBed } from '@angular/core/testing';
import * as common from '@angular/common';
import { LocaleResolverService } from './locale-resolver.service';


import {
  I18N_DEFAULT_LOCALE,
  I18N_LANGUAGE_TO_LOCALE
} from '../i18n.config';

describe('LocaleResolverService', () => {
  let service: LocaleResolverService;

  // Helpers -------------------------------------------------------------

  function setQueryString(qs: string) {
    const base = window.location.origin + window.location.pathname;
    window.history.replaceState({}, '', qs ? `${base}?${qs}` : base);
  }

  function setNavigatorLanguage(lang: string | undefined) {
    Object.defineProperty(window.navigator, 'language', {
      value: lang,
      configurable: true
    });
  }

  // --------------------------------------------------------------------

  beforeEach(() => {
    spyOn(common, 'registerLocaleData').and.stub();

    TestBed.configureTestingModule({
      providers: [LocaleResolverService]
    });

    service = TestBed.inject(LocaleResolverService);
  });

  afterEach(() => {
    setQueryString('');
    setNavigatorLanguage('en-GB');
  });

  describe('init', () => {
    it('should register locales and set the locale property', () => {
      // Act
      service.init();

      // Assert
      expect(common.registerLocaleData).toHaveBeenCalledTimes(2);
      expect(service.locale).toBeTruthy();
    });
  });

  describe('locale resolution', () => {
    it('should prioritize ?locale query param when supported', () => {
      // Arrange
      setQueryString('locale=it-IT');
      setNavigatorLanguage('en-GB');

      // Act
      service.init();

      // Assert
      expect(service.locale).toBe('it-IT');
    });

    it('should fall back to browser language mapping if query param is not supported', () => {
      // Arrange
      setQueryString('locale=xx-YY'); // not supported
      setNavigatorLanguage('en-GB');
      const expectedFromBrowser = I18N_LANGUAGE_TO_LOCALE['en'];

      // Act
      service.init();

      // Assert
      expect(service.locale).toBe(expectedFromBrowser);
    });

    it('should use browser language mapping when no query param is present', () => {
      // Arrange
      setQueryString('');
      setNavigatorLanguage('en-US'); // -> base 'en' is mapped
      const expected = I18N_LANGUAGE_TO_LOCALE['en'];

      // Act
      service.init();

      // Assert
      expect(service.locale).toBe(expected);
    });

    it('should fall back to default locale if browser language is not mapped', () => {
      // Arrange
      setQueryString('');
      setNavigatorLanguage('pt-BR'); // presumably not mapped

      // Act
      service.init();

      // Assert
      expect(service.locale).toBe(I18N_DEFAULT_LOCALE);
    });

    it('should fall back to default locale if navigator.language is undefined', () => {
      // Arrange
      setQueryString('');
      setNavigatorLanguage(undefined as unknown as string);

      // Act
      service.init();

      // Assert
      expect(service.locale).toBe(I18N_DEFAULT_LOCALE);
    });
  });

  describe('precedence order', () => {
    it('should resolve query param over browser language', () => {
      // Arrange
      setQueryString('locale=it-IT');
      setNavigatorLanguage('en-GB');
      const browserMapped = I18N_LANGUAGE_TO_LOCALE['en'];

      // Act
      service.init();

      // Assert
      expect(service.locale).toBe('it-IT');
      expect(service.locale).not.toBe(browserMapped);
    });
  });
});
