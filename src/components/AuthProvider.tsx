import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { login, signup } from '../services/AuthService';
import { getCurrentUser } from '../services/UserService';

interface AuthContextType {
  user: { username: string; role: string } | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found');
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching current user:', error);
        localStorage.removeItem('token'); // Remove invalid token if error occurs
      }
    };

    fetchCurrentUser();
  }, []);

  const signIn = async (username: string, password: string) => {
    await login(username, password);
    const userData = await getCurrentUser();
    setUser(userData);
    localStorage.setItem('username', userData.username);
  };

  const signUp = async (username: string, password: string) => {
    await signup(username, password);
    await signIn(username, password);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const isLoggedIn = () => user !== null;

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
