import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AUTH_API_URL_TOKEN, AUTH_API_PATH } from './security.config';
import { AuthenticationApiService } from './services/authentication-api.service';
import { TokenStorageService } from './services/token-storage.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: AUTH_API_URL_TOKEN,
      useValue: environment.apiBaseUrl + AUTH_API_PATH
    },
    AuthenticationApiService,
    TokenStorageService,
  ]
})
export class SecurityModule { }
