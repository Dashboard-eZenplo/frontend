import {
  getRolesFromToken,
  getUsernameFromToken,
  getUserIdFromToken,
  isTokenExpired
} from './jwt-decoder';

describe('Token Utility Functions', () => {
  const mockToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiUk9MRVMiOlsiYWRtaW4iLCJ1c2VyIl0sIlVTRVJfSUQiOjEsImlhdCI6MTY5NTAwMDAwMCwiZXhwIjoyNTI0NjA4MDAwfQ.F2ExNudIFwmr0OJTDiFiie60RH4sFUHDAmVAxgwG3lA';
  const decodedToken = {
    sub: 'user123',
    name: 'John Doe',
    ROLES: ['admin', 'user'],
    iat: 1695000000,
    exp: 2524608000
  };

  beforeAll(() => {
    jest.mock('jwt-decode', () => () => decodedToken);
  });

  test('should return roles from token', () => {
    const roles = getRolesFromToken(mockToken);
    expect(roles).toEqual(['admin', 'user']);
  });

  test('should return username from token', () => {
    const username = getUsernameFromToken(mockToken);
    expect(username).toBe('user123');
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
