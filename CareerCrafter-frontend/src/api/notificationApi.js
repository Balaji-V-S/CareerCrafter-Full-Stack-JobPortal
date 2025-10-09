// src/api/notificationApi.js
import axiosInstance from "./axiosInstance";

// Placeholder for notification related calls
export const fetchNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};
