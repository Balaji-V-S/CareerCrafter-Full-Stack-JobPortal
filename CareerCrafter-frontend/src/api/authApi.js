// src/api/authApi.js
import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axiosInstance.post("/auth/change-password", passwordData);
  return response.data;
};
