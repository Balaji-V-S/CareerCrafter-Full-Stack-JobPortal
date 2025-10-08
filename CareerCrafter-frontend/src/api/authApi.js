import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Register new user (job seeker or employer)
export async function register(payload) {
  return axios.post(`${API_BASE_URL}/auth/register`, payload);
}

// Login user
export async function login(payload) {
  return axios.post(`${API_BASE_URL}/auth/login`, payload);
}

// Change password
export async function changePassword(token, payload) {
  return axios.post(`${API_BASE_URL}/auth/change-password`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Logout (optional: invalidate token server-side)
export async function logout(token) {
  return axios.post(`${API_BASE_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
