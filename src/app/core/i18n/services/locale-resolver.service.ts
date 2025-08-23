import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import {
  I18N_DEFAULT_LANGUAGE,
  I18N_DEFAULT_LOCALE,
  I18N_LANGUAGE_TO_LOCALE,
  I18N_SUPPORTED_LANGUAGES,
  SupportedLanguage
} from '../i18n.config';

import localeIt from '@angular/common/locales/it';
import localeEnGb from '@angular/common/locales/en-GB';


@Injectable({
  providedIn: 'root'
})
export class LocaleResolverService {
  locale!: string;

  constructor() {}

  init(): void {
    this.registerLocalesOnce();

    this.locale = this.resolveLocale() ?? I18N_DEFAULT_LOCALE;
  }

  private registerLocalesOnce(): void {
    registerLocaleData(localeEnGb);
    registerLocaleData(localeIt);
  }

  private resolveLocale(): string {
    const fromQuery = new URLSearchParams(window.location.search).get('locale');
    if (fromQuery && this.isSupportedLocale(fromQuery)) return fromQuery;

    const nav = (navigator.language || I18N_DEFAULT_LOCALE).toLowerCase();
    const lang = (nav.split('-')[0] as SupportedLanguage);
    const fromBrowser = I18N_LANGUAGE_TO_LOCALE[lang];
    if (fromBrowser) return fromBrowser;

    return I18N_DEFAULT_LOCALE;
  }

  private isSupportedLocale(loc: string): boolean {
    const base = this.localeToLanguage(loc);
    return (I18N_SUPPORTED_LANGUAGES as readonly string[]).includes(base);
  }

  private localeToLanguage(locale: string): SupportedLanguage {
    return (locale.split('-')[0] as SupportedLanguage) ?? I18N_DEFAULT_LANGUAGE;
  }
}
