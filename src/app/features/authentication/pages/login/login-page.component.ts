import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoginFormComponent } from '../../components/login/login-form.component';
import { AuthenticationStateService, UserCredentials } from '../../../../core/security';

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
    private readonly activatedRoute: ActivatedRoute) {
    this.loginError = null;
  }

  login(credentials: UserCredentials) {
    this.authService.login(credentials).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.loginError = null;
          this.router.navigate(['../success'], { relativeTo: this.activatedRoute }).then(_ => {});
        } else {
          this.loginError = 'Credenziali non valide';
          this.cdr.detectChanges();
        }
      },
      error: err => {
        this.loginError = 'Errore durante il login';
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

}
