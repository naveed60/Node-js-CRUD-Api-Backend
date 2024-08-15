import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from "../services/api"; // API call to fetch current user

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // No need for an id argument
        setUser(currentUser); // Use setUser to update the state
      } catch (error) {
        console.error("Failed to fetch user frontend", error);
      }
    };
    fetchUser(); // Call fetchUser without passing an id
  }, []); // Dependency array is empty to run once on mount
  

  const login = (userData) => {
    // Set user data and store the token
    setUser(userData);
    localStorage.setItem('token', userData.accessToken); // Store token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
