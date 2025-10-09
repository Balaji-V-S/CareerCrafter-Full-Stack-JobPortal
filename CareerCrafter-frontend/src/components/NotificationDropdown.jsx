import React, { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const { notifications, markAsRead } = useContext(NotificationContext);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <span className="material-icons">notifications</span>
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-20">
          <ul>
            {notifications.length === 0 ? (
              <li className="p-4 text-sm text-gray-500">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
                    n.read ? "bg-gray-50" : "bg-blue-50"
                  }`}
                  onClick={() => markAsRead(n.id)}
                >
                  {n.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
