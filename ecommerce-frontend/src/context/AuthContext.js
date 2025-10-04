import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getCurrentUser, isAuthenticated } from '../api/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser && isAuthenticated()) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      // Get user data from localStorage (set by authService)
      const userData = getCurrentUser();
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, fullName) => {
    try {
      const response = await registerService(email, password, fullName);
      // Get user data from localStorage (set by authService)
      const userData = getCurrentUser();
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
