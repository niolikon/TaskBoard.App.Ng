export const I18N_SUPPORTED_LANGUAGES = ['en', 'it'];

export type SupportedLanguage = typeof I18N_SUPPORTED_LANGUAGES[number];
export const I18N_LANGUAGE_TO_LOCALE: Record<SupportedLanguage, string> = {
  en: 'en-US',
  it: 'it-IT',
};

export const I18N_DEFAULT_LANGUAGE = 'en';
export const I18N_DEFAULT_LOCALE = I18N_LANGUAGE_TO_LOCALE[I18N_DEFAULT_LANGUAGE];

export const I18N_CORE_TRANSLATIONS_PATH = './i18n/core/';
