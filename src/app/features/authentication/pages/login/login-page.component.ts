import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoginFormComponent } from '../../components/login/login-form.component';
import { AuthenticationStateService, UserCredentials } from '../../../../core/security';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginError: string | null;

  constructor(
    private readonly authService: AuthenticationStateService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly translate: TranslateService) {
    this.loginError = null;
  }

  login(credentials: UserCredentials) {
    this.authService.login(credentials).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.loginError = null;
          this.router.navigate(['../success'], { relativeTo: this.activatedRoute }).then(_ => {});
        } else {
          this.translate.get('AUTHENTICATION__LOGIN_PAGE__CREDENTIALS_INVALID').subscribe(msg => {
            this.forceLoginErrorRefresh(msg);
          });
        }
      },
      error: err => {
        this.translate.get('AUTHENTICATION__LOGIN_PAGE__ERROR_ON_LOGIN').subscribe(msg => {
          this.forceLoginErrorRefresh(msg);
        });
        console.error(err);
      }
    });
  }

  forceLoginErrorRefresh(message: string) {
    this.loginError = null;
    this.cdr.detectChanges();
    this.loginError = message;
    this.cdr.detectChanges();
  }
}
