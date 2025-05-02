import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationStateService } from '../services/authentication-state.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly authenticationStateService: AuthenticationStateService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const redirectTo = route.data['redirectUnauthorizedTo'] ?? '/login';

    return this.authenticationStateService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate([redirectTo]).then(success => {
            if (!success) {
              console.warn('Redirection for unauthorized access was rejected or failed.');
            }
          });
        }
        return isAuthenticated;
      })
    );
  }
}
