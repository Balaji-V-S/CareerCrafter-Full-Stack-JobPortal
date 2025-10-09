import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="CareerCrafter Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-blue-600">CareerCrafter</span>
        </Link>
        <nav className="space-x-6 text-gray-700 font-semibold">
          <Link to="/jobs" className="hover:text-blue-600 transition">
            Jobs
          </Link>
          <Link to="/employer/dashboard" className="hover:text-blue-600 transition">
            Employer
          </Link>
          <Link to="/jobseeker/dashboard" className="hover:text-blue-600 transition">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
