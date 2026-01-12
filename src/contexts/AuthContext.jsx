import { createContext, useContext, useEffect, useState } from 'react';

const defaultState = {
  token: null,
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

  const login = ({ token }) => {
    setAuth({ token, isAuthenticated: true });
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
