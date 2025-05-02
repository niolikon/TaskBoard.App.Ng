import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, finalize, forkJoin, map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { I18N_SUPPORTED_LANGUAGES } from '../i18n.config';

@Injectable({
  providedIn: 'root'
})
export class FeatureLocalizationLoaderService {
  private readonly localizationsReadySubject = new BehaviorSubject<boolean>(true);
  localizationsReady$ = this.localizationsReadySubject.asObservable();

  private readonly preloadedFeatures = new Set<string>();
  private activeLoadings = 0;

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService
  ) {}

  preloadFeatureLocalizations(feature: string): Observable<void> {
    if (this.preloadedFeatures.has(feature)) {
      return of(undefined);
    }

    this.notifyLoadingStarted();
    this.preloadedFeatures.add(feature);

    const observables = I18N_SUPPORTED_LANGUAGES.map(lang =>
      this.loadFeatureLocalizations(feature, lang).pipe(
        tap(t => this.translateService.setTranslation(lang, t, true))
      )
    );

    return forkJoin(observables).pipe(
      tap(() => this.preloadedFeatures.add(feature)),
      finalize(() => this.notifyLoadingCompleted()),
      map(() => undefined)
    );
  }

  preloadCoreLocalizations(): Observable<void> {
    return this.preloadFeatureLocalizations('core');
  }

  preloadSharedLocalizations(): Observable<void> {
    return this.preloadFeatureLocalizations('shared');
  }


  private notifyLoadingStarted() {
    this.activeLoadings++;
    if (this.activeLoadings === 1) {
      this.localizationsReadySubject.next(false);
    }
  }

  private notifyLoadingCompleted() {
    this.activeLoadings = Math.max(0, this.activeLoadings - 1);
    if (this.activeLoadings === 0) {
      this.localizationsReadySubject.next(true);
    }
  }

  private loadFeatureLocalizations(feature: string, lang: string): Observable<object> {
    let basePath: string;
    switch (feature) {
      case 'core': basePath = 'i18n/core'; break;
      case 'shared': basePath = 'i18n/shared'; break;
      default: basePath = `i18n/features/${feature}`; break;
    }

    return this.http.get<object>(`${basePath}/${lang}.json`).pipe(
      catchError(err => {
        console.warn(`Error loading ${basePath}/${lang}.json`, err);
        return of({});
      })
    );
  }
}

