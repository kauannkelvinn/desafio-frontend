'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// define o formato do usuario mockado
interface User {
    name: string;
    email: string;
}

// define o que o contexto vai fornecer
interface AuthContextType {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    //efeito pra verificar se ja existe um usuario logado no localStorage
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
      }, []);  // O array vazio garante que isso rode apenas uma vez

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

// hook personalizado para usar o contexto de autenticação
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}