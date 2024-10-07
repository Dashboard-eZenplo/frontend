import { isAdmin, getUserEMailFromToken, getUserIdFromToken, isTokenExpired } from './jwt-decoder';

describe('Token Utility Functions', () => {
  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzQGVtYWlsLmNvbSIsImFkbWluIjoxLCJ1c2VyX2lkIjoxLCJpYXQiOjE2OTUwMDAwMDAsImV4cCI6MjUyNDYwODAwMH0.Ke2bV9ysy4HBb0_F6bsCEP2DoLtY3QLJ895KmplhEmA';
  const decodedToken = {
    sub: 'user123@email.com',
    admin: 1,
    user_id: 1,
    iat: 1695000000,
    exp: 2524608000
  };

  beforeAll(() => {
    jest.mock('jwt-decode', () => () => decodedToken);
  });

  test('should return if user is admin from token', () => {
    const isUserAdmin = isAdmin(mockToken);
    expect(isUserAdmin).toEqual(1);
  });

  test('should return user email from token', () => {
    const userEmail = getUserEMailFromToken(mockToken);
    expect(userEmail).toBe('user123@email.com');
  });

  test('should return user ID from token', () => {
    const userId = getUserIdFromToken(mockToken);
    expect(userId).toBe(1);
  });

  test('should return false if token is not expired', () => {
    const expired = isTokenExpired(mockToken);
    expect(expired).toBe(false);
  });

  test('should return true if token is expired', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 2524608001 * 1000);

    const expired = isTokenExpired(mockToken);
    expect(expired).toBe(true);

    jest.restoreAllMocks();
  });
});
