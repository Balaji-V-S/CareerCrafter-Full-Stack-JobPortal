import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock user object for frontend testing
  const [user, setUser] = useState({
    id: 1,
    name: "Test User",
    role: "JOB_SEEKER", // Change to "JOB_SEEKER" to test that role
  });

  const [loading, setLoading] = useState(false);

  // Remove backend API calls and token handling for now.
  // You can optionally keep loading state for async simulation.

  // Mock login function (always succeeds)
  async function login(credentials) {
    setUser({
      id: 1,
      name: "Test User",
      role: credentials.role || "EMPLOYER",
    });
    return true;
  }

  // Mock logout function (clears user)
  async function logout() {
    setUser(null);
  }

  // Update user locally
  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
