import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18N_DEFAULT_LANGUAGE } from './i18n.config';
import { LanguageSelectionService } from './services/language-selection.service';
import { FeatureLocalizationLoaderService } from './services/feature-localization-loader.service';
import { forkJoin } from 'rxjs';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/core/', '.json');
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
})
export class CoreI18nModule {
  constructor(
    languageSelectionService: LanguageSelectionService,
    translate: TranslateService,
    featureLocalizationLoaderService: FeatureLocalizationLoaderService
  ) {
    const browserLanguage = translate.getBrowserLang() ?? I18N_DEFAULT_LANGUAGE;
    translate.setDefaultLang(I18N_DEFAULT_LANGUAGE);

    forkJoin([
      featureLocalizationLoaderService.preloadCoreLocalizations(),
      featureLocalizationLoaderService.preloadSharedLocalizations()
    ]).subscribe(() => {
      languageSelectionService.setLanguage(browserLanguage);
    });
  }
}
