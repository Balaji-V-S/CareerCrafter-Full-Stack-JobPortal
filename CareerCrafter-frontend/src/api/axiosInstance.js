// src/api/axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken"); // or your storage mechanism
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
