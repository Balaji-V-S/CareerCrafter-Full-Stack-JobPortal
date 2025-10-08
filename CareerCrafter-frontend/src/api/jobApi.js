import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Get all job listings with optional filters
export async function getJobs(filters = {}, token) {
  return axios.get(`${API_BASE_URL}/jobs`, {
    params: filters,
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Get single job listing by ID
export async function getJobDetails(id, token) {
  return axios.get(`${API_BASE_URL}/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Create new job (employer only)
export async function createJob(payload, token) {
  return axios.post(`${API_BASE_URL}/jobs`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Update job (employer only)
export async function updateJob(id, payload, token) {
  return axios.put(`${API_BASE_URL}/jobs/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Delete job
export async function deleteJob(id, token) {
  return axios.delete(`${API_BASE_URL}/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
