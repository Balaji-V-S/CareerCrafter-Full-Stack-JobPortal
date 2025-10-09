// src/api/jobSeekerApi.js
import axiosInstance from "./axiosInstance";

// Get profile of specific user by userId
export const getJobSeekerProfileById = async (userId) => {
  const response = await axiosInstance.get(`/jobseeker-profile/view/${userId}`);
  return response.data;
};

// Update profile by id
export const updateJobSeekerProfileById = async (id, profileData) => {
  const response = await axiosInstance.put(`/jobseeker-profile/update/${id}`, profileData);
  return response.data;
};

// Delete/deactivate profile by id
export const deleteJobSeekerProfileById = async (id) => {
  const response = await axiosInstance.delete(`/jobseeker-profile/deactivate/${id}`);
  return response.data;
};

// Optional: fetch all profiles
export const getAllJobSeekerProfiles = async () => {
  const response = await axiosInstance.get("/jobseeker-profile/showAll");
  return response.data;
};

