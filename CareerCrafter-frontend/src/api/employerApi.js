import axiosInstance from "./axiosInstance";

// Get employer profile
export const getEmployerProfileByUserId = async (userId) => {
  const response = await axiosInstance.get(`/employer-profile/view/${userId}`);
  return response.data;
};

// Update employer profile
export const updateEmployerProfileByUserId = async (userId, profileData) => {
  const response = await axiosInstance.put(`/employer-profile/update/${userId}`, profileData);
  return response.data;
};
