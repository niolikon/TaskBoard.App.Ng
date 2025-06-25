import { TestBed } from '@angular/core/testing';
import { AuthenticationStateService } from './authentication-state.service';
import { AuthenticationApiService } from './authentication-api.service';
import { TokenStorageService } from './token-storage.service';
import { UserCredentials } from '../models/user-credentials';
import { UserTokenDto } from '../dto';
import { of, throwError, firstValueFrom } from 'rxjs';

describe('AuthenticationStateService', () => {
  let service: AuthenticationStateService;
  let apiMock: jasmine.SpyObj<AuthenticationApiService>;
  let storageMock: jasmine.SpyObj<TokenStorageService>;

  const dummyAccessToken = [
    btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })),
    btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })),
    'signature'
  ].join('.');

  const dummyToken: UserTokenDto = {
    AccessToken: dummyAccessToken,
    RefreshToken: 'xyz789'
  };

  beforeEach(() => {
    apiMock = jasmine.createSpyObj('AuthenticationApiService', ['login', 'refreshToken', 'logout']);
    storageMock = jasmine.createSpyObj('TokenStorageService', ['getToken', 'saveToken', 'clearToken']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationStateService,
        { provide: AuthenticationApiService, useValue: apiMock },
        { provide: TokenStorageService, useValue: storageMock }
      ]
    });

    storageMock.getToken.and.returnValue(null);
    service = TestBed.inject(AuthenticationStateService);
  });

  it('should initialize isAuthenticated$ to false when no token is present', async () => {
    // Arrange done in beforeEach

    // Act
    const state = await firstValueFrom(service.isAuthenticated$);

    // Assert
    expect(state).toBeFalse();
  });

  it('should initialize isAuthenticated$ to true when token exists', async () => {
    // Arrange
    storageMock.getToken.and.returnValue(dummyToken);

    // Act
    const svc = new AuthenticationStateService(apiMock, storageMock);
    const state = await firstValueFrom(svc.isAuthenticated$);

    // Assert
    expect(state).toBeTrue();
  });

  it('should isAuthenticated$ emit true and store token when login is successful', async () => {
    // Arrange
    const credentials: UserCredentials = { UserName: 'user', PassWord: 'pass' };
    apiMock.login.and.returnValue(of(dummyToken));

    // Act
    const result = await firstValueFrom(service.login(credentials));

    // Assert
    expect(result).toBeTrue();
    expect(apiMock.login).toHaveBeenCalledWith(credentials);
    expect(storageMock.saveToken).toHaveBeenCalledWith(dummyToken);

    const state = await firstValueFrom(service.isAuthenticated$);
    expect(state).toBeTrue();
  });

  it('should isAuthenticated$ emit false when login is not successful', async () => {
    spyOn(console, 'error');
    const credentials: UserCredentials = { UserName: 'user', PassWord: 'wrong' };
    apiMock.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

    // Act
    const result = await firstValueFrom(service.login(credentials));

    // Assert
    expect(result).toBeFalse();

    const state = await firstValueFrom(service.isAuthenticated$);
    expect(state).toBeFalse();
  });

  it('should isAuthenticated$ emit true and update token when refreshToken is successful', async () => {
    storageMock.getToken.and.returnValue(dummyToken);
    apiMock.refreshToken.and.returnValue(of(dummyToken));

    // Act
    const result = await firstValueFrom(service.refreshToken());

    // Assert
    expect(result).toBeTrue();
    expect(apiMock.refreshToken).toHaveBeenCalledWith(dummyToken);
    expect(storageMock.saveToken).toHaveBeenCalledWith(dummyToken);

    const state = await firstValueFrom(service.isAuthenticated$);
    expect(state).toBeTrue();
  });

  it('should isAuthenticated$ emit false and clear token when refreshToken fails', async () => {
    spyOn(console, 'error');
    storageMock.getToken.and.returnValue(dummyToken);
    apiMock.refreshToken.and.returnValue(throwError(() => new Error('Token expired')));

    // Act
    const result = await firstValueFrom(service.refreshToken());

    // Assert
    expect(result).toBeFalse();
    expect(storageMock.clearToken).toHaveBeenCalled();

    const state = await firstValueFrom(service.isAuthenticated$);
    expect(state).toBeFalse();
  });

  it('should isAuthenticated$ emit false and clear token when logout is successful', async () => {
    storageMock.getToken.and.returnValue(dummyToken);
    apiMock.logout.and.returnValue(of(void 0));

    // Act
    const result = await firstValueFrom(service.logout());

    // Assert
    expect(result).toBeTrue();
    expect(apiMock.logout).toHaveBeenCalledWith(dummyToken);
    expect(storageMock.clearToken).toHaveBeenCalled();

    const state = await firstValueFrom(service.isAuthenticated$);
    expect(state).toBeFalse();
  });

  it('should isAuthenticated$ emit false and clear token when logout fails', async () => {
    spyOn(console, 'error');
    storageMock.getToken.and.returnValue(dummyToken);
    apiMock.logout.and.returnValue(throwError(() => new Error('Logout failed')));

    // Act
    const result = await firstValueFrom(service.logout());

    // Assert
    expect(result).toBeTrue();
    expect(apiMock.logout).toHaveBeenCalledWith(dummyToken);
    expect(storageMock.clearToken).toHaveBeenCalled();

    const state = await firstValueFrom(service.isAuthenticated$);
    expect(state).toBeFalse();
  });
});
