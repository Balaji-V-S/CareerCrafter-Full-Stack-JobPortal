import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Job seeker applies for a job
export async function applyToJob(jobId, payload, token) {
  return axios.post(`${API_BASE_URL}/applications/${jobId}/apply`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Job seeker gets their applications
export async function getMyApplications(token) {
  return axios.get(`${API_BASE_URL}/applications/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Employer gets applications for a job
export async function getJobApplications(jobId, token) {
  return axios.get(`${API_BASE_URL}/applications/job/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Employer updates application status
export async function updateApplicationStatus(applicationId, payload, token) {
  return axios.put(`${API_BASE_URL}/applications/${applicationId}/status`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
