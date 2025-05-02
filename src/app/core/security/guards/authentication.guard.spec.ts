import { TestBed } from '@angular/core/testing';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationStateService } from '../services/authentication-state.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let authStateMock: jasmine.SpyObj<AuthenticationStateService>;
  let routerMock: jasmine.SpyObj<Router>;
  let isAuthenticated$: Observable<boolean>;

  beforeEach(() => {
    // Default auth state
    isAuthenticated$ = of(false);

    // Create spy for AuthenticationStateService with spyProperty
    authStateMock = jasmine.createSpyObj(
      'AuthenticationStateService',
      [],
      ['isAuthenticated$']
    );

    // Spy for Router with Promise-returning navigate
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    routerMock.navigate.and.returnValue(Promise.resolve(true));

    // Override the observable property
    Object.defineProperty(authStateMock, 'isAuthenticated$', {
      get: () => isAuthenticated$
    });

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthenticationStateService, useValue: authStateMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should allow activation when user is authenticated', (done) => {
    // Arrange
    isAuthenticated$ = of(true);
    const route = new ActivatedRouteSnapshot();
    route.data = {}; // ensure it's defined
    const state = {} as RouterStateSnapshot;

    // Act
    guard.canActivate(route, state).subscribe(result => {
      // Assert
      expect(result).toBeTrue();
      expect(routerMock.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect and block activation when user is not authenticated', (done) => {
    // Arrange
    isAuthenticated$ = of(false);
    const route = new ActivatedRouteSnapshot();
    route.data = { redirectUnauthorizedTo: '/custom-login' };
    const state = {} as RouterStateSnapshot;

    // Act
    guard.canActivate(route, state).subscribe(result => {
      // Assert
      expect(result).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/custom-login']);
      done();
    });
  });

  it('should redirect to /login when no custom redirect is provided', (done) => {
    // Arrange
    isAuthenticated$ = of(false);
    const route = new ActivatedRouteSnapshot();
    route.data = {}; // no custom redirect
    const state = {} as RouterStateSnapshot;

    // Act
    guard.canActivate(route, state).subscribe(result => {
      // Assert
      expect(result).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
