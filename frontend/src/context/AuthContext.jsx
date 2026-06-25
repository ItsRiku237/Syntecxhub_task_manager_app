import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/axios.js';
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth
} from '../utils/authStorage.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const storedAuth = getStoredAuth();
  const [user, setUser] = useState(storedAuth?.user || null);
  const [token, setToken] = useState(storedAuth?.token || null);

  const saveSession = (auth) => {
    setUser(auth.user);
    setToken(auth.token);
    setStoredAuth(auth);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    saveSession({ user: data.user, token: data.token });
  };

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    saveSession({ user: data.user, token: data.token });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearStoredAuth();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      register,
      login,
      logout,
      isAuthenticated: Boolean(user && token)
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
