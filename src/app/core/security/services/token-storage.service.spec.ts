import { TokenStorageService } from './token-storage.service';
import { UserTokenDto } from '../dto';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  const tokenKey = 'user-token';
  const mockToken: UserTokenDto = {
    AccessToken: 'abc123',
    RefreshToken: 'xyz789'
  };

  beforeEach(() => {
    service = new TokenStorageService();

    // Clear any real localStorage to avoid leakage between tests
    localStorage.clear();
  });

  it('should save token to localStorage when saveToken', () => {
    // Arrange
    spyOn(localStorage, 'setItem');

    // Act
    service.saveToken(mockToken);

    // Assert
    expect(localStorage.setItem).toHaveBeenCalledWith(tokenKey, JSON.stringify(mockToken));
  });

  it('should retrieve token from localStorage when getToken', () => {
    // Arrange
    localStorage.setItem(tokenKey, JSON.stringify(mockToken));

    // Act
    const token = service.getToken();

    // Assert
    expect(token).toEqual(mockToken);
  });

  it('should return null if no token is stored when getToken', () => {
    // Arrange
    localStorage.removeItem(tokenKey);

    // Act
    const token = service.getToken();

    // Assert
    expect(token).toBeNull();
  });

  it('should clear token from localStorage when clearToken', () => {
    // Arrange
    localStorage.setItem(tokenKey, JSON.stringify(mockToken));

    // Act
    service.clearToken();

    // Assert
    expect(localStorage.getItem(tokenKey)).toBeNull();
  });
});
