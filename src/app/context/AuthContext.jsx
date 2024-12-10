'use client';
import { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, userId, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ user, userId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
