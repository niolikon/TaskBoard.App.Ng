import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18N_DEFAULT_LANGUAGE, I18N_CORE_TRANSLATIONS_PATH  } from './i18n.config';
import { LanguageSelectionService } from './services/language-selection.service';
import { FeatureLocalizationLoaderService } from './services/feature-localization-loader.service';
import { LocaleResolverService } from './services/locale-resolver.service';
import { forkJoin } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { matPaginatorIntlFactory } from './factory/paginator-intl.factory';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, I18N_CORE_TRANSLATIONS_PATH, '.json');
}

export function localeIdFactory(resolver: LocaleResolverService): string {
  return resolver.locale ?? 'en-US';
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    { provide: LOCALE_ID, useFactory: localeIdFactory, deps: [LocaleResolverService] },
    { provide: MatPaginatorIntl, useFactory: matPaginatorIntlFactory, deps: [TranslateService] }
  ]
})
export class CoreI18nModule {
  constructor(
    languageSelectionService: LanguageSelectionService,
    translate: TranslateService,
    featureLocalizationLoaderService: FeatureLocalizationLoaderService,
    localeResolverService: LocaleResolverService
  ) {
    translate.setDefaultLang(I18N_DEFAULT_LANGUAGE);
    localeResolverService.init();

    const browserLanguage = languageSelectionService.normalizeToSupported(translate.getBrowserLang())
      ?? I18N_DEFAULT_LANGUAGE;

    forkJoin([
      featureLocalizationLoaderService.preloadCoreLocalizations(),
      featureLocalizationLoaderService.preloadSharedLocalizations()
    ]).subscribe(() => {
      languageSelectionService.setLanguage(browserLanguage);
      localeResolverService.resolveLocaleFromLanguage(browserLanguage);
    });
  }
}
