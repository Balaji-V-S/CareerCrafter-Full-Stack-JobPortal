// src/api/userApi.js
import axiosInstance from "./axiosInstance";

export const fetchUserInfo = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await axiosInstance.put("/users/me", userData);
  return response.data;
};
