import React, { createContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));

  // Decode token and set user info
  const loadUserFromToken = (token) => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.sub, email: decoded.email, roles: decoded.roles });
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromToken(jwtToken);
  }, [jwtToken]);

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    setJwtToken(token);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setJwtToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  const hasRole = (role) => {
    return user?.roles?.includes(role);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, hasRole, jwtToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
