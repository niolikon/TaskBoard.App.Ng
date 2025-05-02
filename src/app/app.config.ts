import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authenticationInterceptor } from './core/security'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { TodosModule } from './features/todos/todos.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authenticationInterceptor
      ]),
      withInterceptorsFromDi(),
      withFetch()
    ),
    importProvidersFrom(CoreModule),
    importProvidersFrom(AuthenticationModule),
    importProvidersFrom(TodosModule),
    provideClientHydration(withEventReplay())
  ]
};
