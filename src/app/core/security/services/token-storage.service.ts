import { Injectable } from '@angular/core';
import { UserTokenDto } from '../dto/user-token.dto';

@Injectable()
export class TokenStorageService {
  private readonly key = 'user-token';

  saveToken(token: UserTokenDto): void {
    localStorage.setItem(this.key, JSON.stringify(token));
  }

  getToken(): UserTokenDto | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : null;
  }

  clearToken(): void {
    localStorage.removeItem(this.key);
  }
}
