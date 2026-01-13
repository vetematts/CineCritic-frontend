/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { get } from '../api/api';
import { getJwtPayload } from '../utils/jwt';

const defaultState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialise auth state from localStorage, if a token is already saved.
  const readToken = () => {
    if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
      return null;
    }
    return localStorage.getItem('token');
  };

  const writeToken = (token) => {
    if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
      return;
    }
    localStorage.setItem('token', token);
  };

  const clearToken = () => {
    if (typeof localStorage === 'undefined' || typeof localStorage.removeItem !== 'function') {
      return;
    }
    localStorage.removeItem('token');
  };

  const [auth, setAuth] = useState(() => {
    const saved = readToken();

    if (!saved) {
      return defaultState;
    }

    const payload = getJwtPayload(saved);

    return {
      token: saved,
      user: payload,
      isAuthenticated: true,
    };
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      clearToken();
      return;
    }

    writeToken(auth.token);
  }, [auth]);

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.token) {
      return;
    }

    let isMounted = true;

    // Restore the user profile from /me when a token is present.
    const restoreSession = async () => {
      try {
        const user = await get('/api/users/me');
        if (isMounted) {
          setAuth((prev) => ({ ...prev, user }));
        }
      } catch {
        if (isMounted) {
          setAuth(defaultState);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [auth.isAuthenticated, auth.token]);

  const login = ({ token, user = null }) => {
    setAuth({ token, user, isAuthenticated: true });
  };

  const logout = () => {
    setAuth(defaultState);
  };

  return <AuthContext.Provider value={{ ...auth, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
