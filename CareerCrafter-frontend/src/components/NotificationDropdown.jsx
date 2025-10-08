import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

function NotificationDropdown() {
  const { notifications, markAsRead } = useContext(NotificationContext);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative cursor-pointer">
      <span className="text-2xl select-none">🔔</span>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {unreadCount}
        </span>
      )}
      <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-auto z-50">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-2 border-b border-gray-200 flex justify-between cursor-pointer ${
                n.isRead ? "bg-white" : "bg-indigo-100 font-semibold"
              } hover:bg-indigo-200`}
            >
              <span>{n.message}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationDropdown;
