import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_API_URL } from './security.config';
import { environment } from '../../../environments/environment';
import { AuthenticationApiService } from './services/authentication-api.service';
import { TokenStorageService } from './services/token-storage.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: AUTH_API_URL, useValue: environment.authApiUrl },
    AuthenticationApiService,
    TokenStorageService,
  ]
})
export class SecurityModule { }
