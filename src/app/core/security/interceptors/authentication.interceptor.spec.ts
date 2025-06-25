import { HttpRequest, HttpHandlerFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { authenticationInterceptor } from './authentication.interceptor';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthenticationStateService } from '../services/authentication-state.service';
import { of, throwError } from 'rxjs';

describe('authenticationInterceptor', () => {
  let tokenStorageServiceSpy: jasmine.SpyObj<TokenStorageService>;
  let authenticationStateSpy: jasmine.SpyObj<AuthenticationStateService>;

  beforeEach(() => {
    tokenStorageServiceSpy = jasmine.createSpyObj('TokenStorageService', ['getToken']);
    authenticationStateSpy = jasmine.createSpyObj('AuthenticationStateService', ['logout']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenStorageService, useValue: tokenStorageServiceSpy },
        { provide: AuthenticationStateService, useValue: authenticationStateSpy }
      ]
    });
  });

  it('should add Authorization header if token exists', () => {
    tokenStorageServiceSpy.getToken.and.returnValue({
      AccessToken: 'mock-token',
      RefreshToken: 'mock-refresh-token'
    });

    const request = new HttpRequest('GET', '/api/Todos');
    const handler: HttpHandlerFn = (req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer mock-token');
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authenticationInterceptor(request, handler).subscribe();
    });
  });

  it('should NOT add Authorization header if token is null', () => {
    tokenStorageServiceSpy.getToken.and.returnValue(null);

    const request = new HttpRequest('GET', '/api/Todos');
    const handler: HttpHandlerFn = (req) => {
      expect(req.headers.has('Authorization')).toBe(false);
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authenticationInterceptor(request, handler).subscribe();
    });
  });

  it('should call logout() on 401 response', () => {
    tokenStorageServiceSpy.getToken.and.returnValue({
      AccessToken: 'mock-token',
      RefreshToken: 'mock-refresh-token'
    });

    const request = new HttpRequest('GET', '/api/Todos');
    const handler: HttpHandlerFn = () =>
      throwError(() =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
          url: '/api/Todos'
        })
      );

    TestBed.runInInjectionContext(() => {
      authenticationInterceptor(request, handler).subscribe({
        error: () => {
          expect(authenticationStateSpy.logout).toHaveBeenCalled();
        }
      });
    });
  });
});
