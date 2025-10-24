'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            queueMicrotask(() => {
              setUser(JSON.parse(storedUser));
            });
          }
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
          localStorage.removeItem('user');
        }
      }, []);

    const login = (name: string, email: string) => {
        const newUser = { name, email };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}