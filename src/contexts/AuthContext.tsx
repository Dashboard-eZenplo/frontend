import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../models/User';
import { login, logout, isAuthenticated, getToken } from '../services/auth/authService';
import { getUserIdFromToken, getUserEMailFromToken, isAdmin } from '../utils/jwt-decoder';
import { useNavigate } from 'react-router-dom';

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isUserAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      const accessToken = response.access_token;

      const loggedInUser: User = {
        id: String(getUserIdFromToken(accessToken)) || '',
        email: getUserEMailFromToken(accessToken),
        admin: isAdmin(accessToken)
      };

      setUser(loggedInUser);
      setIsUserAuthenticated(true);

      navigate(loggedInUser.admin ? '/admin-dashboard' : '/dashboard');
    } catch (error) {
      console.error('Error while signing in: ', error);
    }
  };

  const signOut = () => {
    logout();
    setUser(null);
    setIsUserAuthenticated(false);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const token = getToken();
      if (token) {
        const currentUser: User = {
          id: String(getUserIdFromToken(token)) || '',
          email: getUserEMailFromToken(token),
          admin: isAdmin(token)
        };
        setUser(currentUser);
        setIsUserAuthenticated(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
