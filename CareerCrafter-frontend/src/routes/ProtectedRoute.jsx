import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Centered loading message with subtle text styling
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // For testing, if user is mocked (not null), allow access without redirect
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If logged in but role unauthorized, show Unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized: render child routes
  return <Outlet />;
}

export default ProtectedRoute;
