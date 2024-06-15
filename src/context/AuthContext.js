import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const checkTokenExpiry = (token) => {
  if (!token) return true;
  const decodedToken = jwt_decode(token);
  const expiryTime = decodedToken.exp * 1000;
  return Date.now() >= expiryTime;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !checkTokenExpiry(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
    }
    setLoading(false);

    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (checkTokenExpiry(currentToken)) {
        logout();
      }
    }, 60000); //check every 60 sec

    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
