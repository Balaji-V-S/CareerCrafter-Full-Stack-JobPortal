// src/utils/dateUtils.js

// Format date string or Date object to locale date string (e.g. "MM/DD/YYYY")
export const formatToLocaleDate = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString();
};

// Format ISO date string to human readable format with time, e.g. "Oct 8, 2025, 3:00 PM"
export const formatDateTime = (isoString) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

// Returns current date/time in ISO string
export const getCurrentIsoDateTime = () => {
  return new Date().toISOString();
};
