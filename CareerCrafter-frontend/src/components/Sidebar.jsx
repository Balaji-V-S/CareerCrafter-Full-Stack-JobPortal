import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <aside className="w-48 bg-white p-4 border-r border-gray-200 h-screen sticky top-0 flex flex-col space-y-3">
      {role === "EMPLOYER" ? (
        <>
          <Link
            to="/employer/dashboard"
            className="block py-2 px-3 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Dashboard
          </Link>
          <Link
            to="/employer/joblistings"
            className="block py-2 px-3 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Jobs
          </Link>
          <Link
            to="/employer/postjob"
            className="block py-2 px-3 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Post Job
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/jobseeker/dashboard"
            className="block py-2 px-3 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Dashboard
          </Link>
          <Link
            to="/jobseeker/applications"
            className="block py-2 px-3 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Applications
          </Link>
          <Link
            to="/jobseeker/profile"
            className="block py-2 px-3 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Profile
          </Link>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
