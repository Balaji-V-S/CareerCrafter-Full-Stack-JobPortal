// src/api/jobApi.js
import axiosInstance from "./axiosInstance";

// Search jobs with optional filters
export const fetchJobs = async (queryParams) => {
  const response = await axiosInstance.get("/job-postings/search", { params: queryParams });
  return response.data;
};

// Fetch job by ID (matches backend)
export const fetchJobById = async (jobId) => {
  const response = await axiosInstance.get(`/job-postings/${jobId}`);
  return response.data;
};

// Post new job (match backend path '/add')
export const postJob = async (jobData) => {
  const response = await axiosInstance.post("/job-postings/add", jobData);
  return response.data;
};

// Update job by ID (match backend path '/update/:id')
export const updateJob = async (jobId, jobData) => {
  const response = await axiosInstance.put(`/job-postings/update/${jobId}`, jobData);
  return response.data;
};

// Delete job (match backend path '/remove/:id')
export const deleteJob = async (jobId) => {
  const response = await axiosInstance.delete(`/job-postings/remove/${jobId}`);
  return response.data;
};
