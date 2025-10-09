import React, { createContext, useState, useEffect } from "react";
import { fetchNotifications } from "../api/notificationApi";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from API
  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  useEffect(() => {
    loadNotifications();
    // Optionally, reload notifications on an interval
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mark notification as read locally
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    // Could also trigger API call here to mark read in backend
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, reload: loadNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
