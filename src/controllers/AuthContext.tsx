import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserDTO } from '../../src/dtos/UserDTO';

interface AuthContextData {
    user: UserDTO | null;
    signIn: (userData: UserDTO) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserDTO | null>(null);

    const signIn = (userData: UserDTO) => {
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
