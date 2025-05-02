import { Injectable, Inject } from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_API_URL_TOKEN } from '../security.config';
import { UserLoginDto, UserTokenDto, UserLogoutDto, UserTokenRefreshDto } from '../dto';

@Injectable()
export class AuthenticationApiService {
  private readonly rawHttp: HttpClient;

  constructor(httpBackend: HttpBackend,
    @Inject(AUTH_API_URL_TOKEN) private readonly apiUrl: string
  ) {
    this.rawHttp = new HttpClient(httpBackend);
  }

  login(credentials: UserLoginDto): Observable<UserTokenDto> {
    return this.rawHttp.post<UserTokenDto>(`${this.apiUrl}/login`, credentials);
  }

  refreshToken(refreshToken: UserTokenRefreshDto): Observable<UserTokenDto> {
    return this.rawHttp.post<UserTokenDto>(`${this.apiUrl}/refresh`, refreshToken);
  }

  logout(logoutDto: UserLogoutDto): Observable<void> {
    return this.rawHttp.post<void>(`${this.apiUrl}/logout`, logoutDto);
  }
}
