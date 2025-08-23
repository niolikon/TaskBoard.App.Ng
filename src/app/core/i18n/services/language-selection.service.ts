import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  I18N_DEFAULT_LANGUAGE,
  I18N_SUPPORTED_LANGUAGES,
  SupportedLanguage
} from '../i18n.config';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectionService {
  private readonly languageSubject = new BehaviorSubject<string>(I18N_DEFAULT_LANGUAGE);
  readonly language$ = this.languageSubject.asObservable();

  constructor(private readonly translate: TranslateService) {}

  setLanguage(language: string): void {
    this.translate.use(language);
    this.languageSubject.next(language);
  }

  normalizeToSupported(lang: string | undefined): SupportedLanguage {
    const base = (lang ?? I18N_DEFAULT_LANGUAGE).split('-')[0].toLowerCase();
    return (I18N_SUPPORTED_LANGUAGES as readonly string[]).includes(base)
      ? (base as SupportedLanguage)
      : I18N_DEFAULT_LANGUAGE;
  }
}
