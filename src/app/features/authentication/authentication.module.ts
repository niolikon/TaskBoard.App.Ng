import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from '../../core/layout/services/navigation.service';
import { FeatureLocalizationLoaderService } from '../../core/i18n/services/feature-localization-loader.service';

// Module routes imports
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Module defined pages imports
import { LoginPageComponent } from './pages/login/login-page.component';
import { LoginSuccessPageComponent } from './pages/login-success/login-success-page.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

// Angular Material modules imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Module defined routes
    AuthenticationRoutingModule,

    // Module defined pages
    LoginPageComponent,
    LoginSuccessPageComponent,

    // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AuthenticationModule {
  constructor(
    navigationService: NavigationService,
    featureLocalizationLoaderService: FeatureLocalizationLoaderService
  ) {
    featureLocalizationLoaderService.preloadFeatureLocalizations('authentication').subscribe(() => {
      navigationService.registerTopbarActions([
        {
          component: LogoutButtonComponent
        }
      ]);
    });
  }
}
