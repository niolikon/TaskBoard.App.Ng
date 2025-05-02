import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { I18N_DEFAULT_LANGUAGE } from '../i18n.config';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectionService {
  private readonly languageSubject = new BehaviorSubject<string>(I18N_DEFAULT_LANGUAGE);
  language$ = this.languageSubject.asObservable();

  constructor(private readonly translate: TranslateService) {}

  setLanguage(language: string): void {
    this.translate.use(language);
    this.languageSubject.next(language);
  }
}
