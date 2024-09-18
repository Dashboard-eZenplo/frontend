import { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../models/User';

interface AuthContextData {
	user: User | null;
	signIn: (userData: User) => void;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	const signIn = (userData: User) => {
		setUser(userData);
	};

	const signOut = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
