import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../models/User';
import { login, logout } from '../services/auth/authService';
import { getUserIdFromToken, getUserEMailFromToken, isAdmin } from '../utils/jwt-decoder';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/authValidation';

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isUserAuthenticated: boolean | undefined;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    const accessToken = response.access_token;

    const loggedInUser: User = {
      id: String(getUserIdFromToken(accessToken)) || '',
      email: getUserEMailFromToken(accessToken),
      admin: isAdmin(accessToken)
    };

    setUser(loggedInUser);
    setIsUserAuthenticated(true);

    navigate(loggedInUser.admin ? '/admin' : '/dashboard');
  };

  const signOut = () => {
    logout();
    setUser(null);
    setIsUserAuthenticated(false);
  };

  useEffect(() => {
    validateToken(setUser, setIsUserAuthenticated);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
