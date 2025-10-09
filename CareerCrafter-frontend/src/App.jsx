import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import EmployerDashboard from "./pages/employer/EmployerDashboard";
import JobListings from "./pages/employer/JobListings";
import PostJob from "./pages/employer/PostJob";
import ViewApplications from "./pages/employer/ViewApplications";

import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import Applications from "./pages/jobseeker/Applications";
import JobDetails from "./pages/jobseeker/JobDetails";
import Profile from "./pages/jobseeker/Profile";

import NotFound from "./pages/common/NotFound";
import Unauthorized from "./pages/common/Unauthorized";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Employer Protected Routes */}
              <Route element={<ProtectedRoute role="employer" />}>
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/job-listings" element={<JobListings />} />
                <Route path="/employer/post-job" element={<PostJob />} />
                <Route path="/employer/view-applications" element={<ViewApplications />} />
              </Route>

              {/* Job Seeker Protected Routes */}
              <Route element={<ProtectedRoute role="jobseeker" />}>
                <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
                <Route path="/jobseeker/applications" element={<Applications />} />
                <Route path="/job-details/:id" element={<JobDetails />} />
                <Route path="/jobseeker/profile" element={<Profile />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
