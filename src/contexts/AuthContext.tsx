import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    const savedAuth = localStorage.getItem('assisthr-admin-auth');
    return savedAuth === 'true';
  });

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, this would be more secure
    if (username === 'Chitra' && password === 'A5Notebook') {
      setIsAuthenticated(true);
      localStorage.setItem('assisthr-admin-auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('assisthr-admin-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};