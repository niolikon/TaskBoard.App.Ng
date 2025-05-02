import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationApiService } from './authentication-api.service';
import { AUTH_API_URL_TOKEN } from '../security.config';
import {
  UserLoginDto,
  UserLogoutDto,
  UserTokenDto,
  UserTokenRefreshDto
} from '../dto';

describe('AuthenticationApiService', () => {
  let service: AuthenticationApiService;
  let httpMock: HttpTestingController;

  const apiUrl = '/api/auth';
  const dummyToken: UserTokenDto = {
    AccessToken: 'access-token',
    RefreshToken: 'refresh-token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationApiService,
        { provide: AUTH_API_URL_TOKEN, useValue: apiUrl }
      ]
    });

    service = TestBed.inject(AuthenticationApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should perform REST call and return UserTokenDto when login with valid credentials', () => {
    // Arrange
    const credentials: UserLoginDto = { UserName: 'test', PassWord: '1234' };

    // Act
    service.login(credentials).subscribe(res => {
      expect(res).toEqual(dummyToken);
    });

    // Assert
    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(dummyToken);
  });

  it('should perform REST call and return UserTokenDto when refresh with valid RefreshToken', () => {
    // Arrange
    const refreshDto: UserTokenRefreshDto = { RefreshToken: 'refresh-token' };

    // Act
    service.refreshToken(refreshDto).subscribe(res => {
      expect(res).toEqual(dummyToken);
    });

    // Assert
    const req = httpMock.expectOne(`${apiUrl}/refresh`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(refreshDto);
    req.flush(dummyToken);
  });

  it('should perform REST call when logout with valid RefreshToken', () => {
    // Arrange
    const logoutDto: UserLogoutDto = { RefreshToken: 'refresh-token' };

    // Act
    service.logout(logoutDto).subscribe(res => {
      expect(res).toBeNull(); // void response
    });

    // Assert
    const req = httpMock.expectOne(`${apiUrl}/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(logoutDto);
    req.flush(null); // void response
  });

  it('should NOT include Authorization header when performing REST calls', () => {
    // Arrange
    const credentials: UserLoginDto = { UserName: 'test', PassWord: '1234' };

    // Act
    service.login(credentials).subscribe();

    // Assert
    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush(dummyToken);
  });
});
