import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import appConfig from '../config/appConfig';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check user authentication status on initial app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem(appConfig.tokenKey);
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(API_ENDPOINTS.AUTH.ME);
        if (response.data?.success) {
          setUser(response.data.data);
        } else {
          localStorage.removeItem(appConfig.tokenKey);
          setUser(null);
        }
      } catch (err) {
        console.warn('Session expired or server unavailable:', err.message);
        localStorage.removeItem(appConfig.tokenKey);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login handler
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await API.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem(appConfig.tokenKey, token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Register handler
  const register = async (name, email, password, confirmPassword) => {
    setError(null);
    try {
      const response = await API.post(API_ENDPOINTS.AUTH.REGISTER, {
        name,
        email,
        password,
        confirmPassword
      });
      const { token, ...userData } = response.data.data;

      localStorage.setItem(appConfig.tokenKey, token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem(appConfig.tokenKey);
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated: !!user
      }}
    >
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
