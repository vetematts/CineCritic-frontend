import { createContext, useContext, useEffect, useState } from 'react';
import { get } from '../api/api';

const defaultState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialise auth state from localStorage, if a token is already saved.
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('token');

    if (!saved) {
      return defaultState;
    }

    return {
      token: saved,
      user: null,
      isAuthenticated: true,
    };
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      localStorage.removeItem('token');
      return;
    }

    localStorage.setItem('token', auth.token);
  }, [auth]);

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.token) {
      return;
    }

    let isMounted = true;

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

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
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
