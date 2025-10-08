import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Get current user profile
export async function getProfile(token) {
  return axios.get(`${API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Update user profile
export async function updateProfile(payload, token) {
  return axios.put(`${API_BASE_URL}/users/me`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Upload resume/documents (multipart/form-data)
export async function uploadResume(file, token) {
  const formData = new FormData();
  formData.append('resume', file);
  return axios.post(`${API_BASE_URL}/users/me/resume`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
}
