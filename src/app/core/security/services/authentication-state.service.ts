import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationApiService } from './authentication-api.service';
import { TokenStorageService } from './token-storage.service';
import { UserTokenDto } from '../dto';
import { UserCredentials } from '../models/user-credentials';

@Injectable({ providedIn: 'root' })
export class AuthenticationStateService {
  private readonly authState = new BehaviorSubject<boolean>(false);
  private refreshTimeout: any = null;

  constructor(
    private readonly apiService: AuthenticationApiService,
    private readonly tokenStorage: TokenStorageService
  ) {
    const hasToken = this.tokenStorage.getToken();
    if (hasToken) {
      this.scheduleRefreshToken(hasToken.AccessToken);
    }

    this.authState.next(hasToken !== null);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  login(credentials: UserCredentials): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.apiService.login(credentials).subscribe({
        next: (token: UserTokenDto) => {
          this.tokenStorage.saveToken(token);
          this.scheduleRefreshToken(token.AccessToken);
          this.authState.next(true);
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          console.error('Login failed', error);
          this.authState.next(false);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  refreshToken(): Observable<boolean>  {
    console.log("refreshToken called");
    return new Observable<boolean>((observer) => {
      const currentToken = this.tokenStorage.getToken();

      if (currentToken) {
        this.apiService.refreshToken(currentToken).subscribe({
          next: (token: UserTokenDto) => {
            this.tokenStorage.saveToken(token);
            this.scheduleRefreshToken(token.AccessToken);
            this.authState.next(true);
            observer.next(true);
            observer.complete();
          },
          error: (error) => {
            console.error('RefreshToken failed', error);
            this.tokenStorage.clearToken();
            this.cancelRefreshToken();
            this.authState.next(false);
            observer.next(false);
            observer.complete();
          }
        });
      }
      else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  logout(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const currentToken = this.tokenStorage.getToken();

      if (currentToken) {
        this.apiService.logout(currentToken).subscribe({
          next: () => {
            this.tokenStorage.clearToken();
            this.cancelRefreshToken();
            this.authState.next(false);
            observer.next(true);
            observer.complete();
          },
          error: (error) => {
            console.error('Logout failed', error);
            this.tokenStorage.clearToken();
            this.cancelRefreshToken();
            this.authState.next(false);
            observer.next(true);
            observer.complete();
          }
        });
      } else {
        this.tokenStorage.clearToken();
        this.cancelRefreshToken();
        this.authState.next(false);
        observer.next(true);
        observer.complete();
      }
    });
  }

  private decodeExpiration(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000;
  }

  private scheduleRefreshToken(accessToken: string): void {
    this.cancelRefreshToken();

    const expTime = this.decodeExpiration(accessToken);
    const now = Date.now();
    const delay = Math.max(expTime - now - 60_000, 0);

    this.refreshTimeout = setTimeout(() => {
      this.refreshToken().subscribe(success => {
        if (!success) {
          this.logout().subscribe();
        }
      });
    }, delay);
  }

  private cancelRefreshToken(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }

}
