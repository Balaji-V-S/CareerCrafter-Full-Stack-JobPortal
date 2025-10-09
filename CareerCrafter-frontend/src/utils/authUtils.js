// src/utils/authUtils.js

// Decode JWT token payload safely
export const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

// Check if a JWT token is expired (assuming exp in seconds)
export const isTokenExpired = (token) => {
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return true;
  const expiration = payload.exp * 1000; // convert to ms
  return Date.now() > expiration;
};

// Extract user roles from JWT payload
export const getUserRolesFromToken = (token) => {
  const payload = decodeJwt(token);
  return payload?.roles || [];
};
