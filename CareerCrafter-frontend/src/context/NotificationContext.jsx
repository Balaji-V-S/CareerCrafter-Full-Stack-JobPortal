import React, { createContext, useState, useEffect, useContext } from "react";
import { getNotifications, markNotificationRead } from "../api/notificationApi";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await getNotifications(token);
        setNotifications(data);
      } catch (error) {
        console.error("NotificationContext: Failed to load notifications", error);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, [user]);

  // Mark notification read and update state optimistically
  async function markAsRead(notificationId) {
    try {
      const token = localStorage.getItem("token");
      await markNotificationRead(notificationId, token);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification read", error);
    }
  }

  return (
    <NotificationContext.Provider value={{ notifications, loading, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
