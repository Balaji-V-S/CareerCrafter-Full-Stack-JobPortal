// src/utils/constants.js

// Example user roles
export const ROLES = {
  EMPLOYER: "employer",
  JOBSEEKER: "jobseeker",
  ADMIN: "admin",
};

// API related constants
export const API = {
  BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080/api",
};

// Other constants
export const APP_NAME = "CareerCrafter";

// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN: "jwtToken",
};
