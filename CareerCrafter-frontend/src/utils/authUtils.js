// Key used for storing token in browser storage
const TOKEN_KEY = "token";

// Save JWT token securely in localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Retrieve JWT token from storage
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove JWT token from storage (logout)
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decode JWT payload (without verifying signature)
export function decodeToken(token) {
  if (!token) return null;
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

// Check if token is expired (checks 'exp' claim in seconds)
export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  const now = Date.now() / 1000;
  return decoded.exp < now;
}
