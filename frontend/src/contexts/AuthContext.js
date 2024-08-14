import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Set user data and possibly store the token
    setUser(userData);
    localStorage.setItem('token', userData.accessToken); // Store token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
