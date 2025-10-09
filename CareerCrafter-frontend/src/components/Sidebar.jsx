import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-5 shadow-md">
      <nav className="flex flex-col space-y-3">
        {menuItems.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition ${
              location.pathname === to ? "bg-blue-600 text-white" : "text-gray-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
