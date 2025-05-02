import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthenticationStateService } from '../services/authentication-state.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenStorageService);
  const authenticationState = inject(AuthenticationStateService);

  const token = tokenService.getToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.AccessToken}`
      }
    });

    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authenticationState.logout();
        }

        return throwError(() => error);
      })
    );
  }

  return next(req);
};
