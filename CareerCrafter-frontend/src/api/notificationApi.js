import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Get notifications for the user
export async function getNotifications(token) {
  return axios.get(`${API_BASE_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Mark notification as read
export async function markNotificationRead(notificationId, token) {
  return axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
