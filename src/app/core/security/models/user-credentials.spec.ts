import { UserCredentials } from './user-credentials';

describe('UserCredentials', () => {
  it('should create an instance with provided username and password', () => {
    // Arrange
    const username = 'testuser';
    const password = 'secret';

    // Act
    const creds = new UserCredentials(username, password);

    // Assert
    expect(creds.UserName).toBe(username);
    expect(creds.PassWord).toBe(password);
  });

  it('should expose a static EMPTY instance with empty values', () => {
    // Act
    const empty = UserCredentials.EMPTY;

    // Assert
    expect(empty.UserName).toBe('');
    expect(empty.PassWord).toBe('');
  });
});
