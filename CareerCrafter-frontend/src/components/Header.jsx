import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NotificationDropdown from "./NotificationDropdown";
import { ROLES } from "../utils/constants";
import logo from "../assets/logo.jpg"; // Adjust path as needed

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth/login");
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-50">
      <img src={logo} alt="CareerCrafter" className="h-8" />
      <nav className="flex space-x-4 text-gray-700">
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>
        {user?.role === ROLES.EMPLOYER && (
          <>
            <Link to="/employer/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/employer/joblistings" className="hover:text-indigo-600">
              My Jobs
            </Link>
            <Link to="/employer/postjob" className="hover:text-indigo-600">
              Post Job
            </Link>
          </>
        )}
        {user?.role === ROLES.JOB_SEEKER && (
          <>
            <Link to="/jobseeker/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/jobseeker/applications" className="hover:text-indigo-600">
              My Applications
            </Link>
          </>
        )}
      </nav>
      <div className="flex items-center space-x-4">
        {user && <NotificationDropdown />}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
