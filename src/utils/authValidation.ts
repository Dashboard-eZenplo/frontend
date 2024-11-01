import { User } from '../models/User';
import { refreshAccessToken, logout } from '../services/auth/authService';
import {
  getUserIdFromToken,
  getUserEMailFromToken,
  isAdmin,
  isTokenExpired
} from '../utils/jwt-decoder';

export const validateToken = async (
  setUser: (user: User | null) => void,
  setIsUserAuthenticated: (auth: boolean) => void
) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    if (!isTokenExpired(token)) {
      const currentUser: User = {
        id: String(getUserIdFromToken(token)) || '',
        email: getUserEMailFromToken(token),
        admin: isAdmin(token)
      };
      setUser(currentUser);
      setIsUserAuthenticated(true);
    } else {
      try {
        const newToken = await refreshAccessToken();
        const currentUser: User = {
          id: String(getUserIdFromToken(newToken)) || '',
          email: getUserEMailFromToken(newToken),
          admin: isAdmin(newToken)
        };
        setUser(currentUser);
        setIsUserAuthenticated(true);
      } catch (error) {
        console.error('Token renewal failed:', error);
        logout();
        setIsUserAuthenticated(false);
      }
    }
  } else {
    setIsUserAuthenticated(false);
  }
};
