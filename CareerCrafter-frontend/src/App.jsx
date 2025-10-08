import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all pages and contexts
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import EmployerDashboard from "./pages/employer/EmployerDashboard";
import PostJob from "./pages/employer/PostJob";
import JobListings from "./pages/employer/JobListings";
import ViewApplications from "./pages/employer/ViewApplications";

import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import Applications from "./pages/jobseeker/Applications";
import Profile from "./pages/jobseeker/Profile";
import JobDetails from "./pages/jobseeker/JobDetails";

import NotFound from "./pages/common/NotFound";
import Unauthorized from "./pages/common/Unauthorized";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="app-container min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-50 p-4">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Employer protected routes */}
                <Route element={<ProtectedRoute allowedRoles={["EMPLOYER"]} />}>
                  <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                  <Route path="/employer/postjob" element={<PostJob />} />
                  <Route path="/employer/joblistings" element={<JobListings />} />
                  <Route path="/employer/viewapplications/:jobId" element={<ViewApplications />} />
                </Route>

                {/* Job Seeker protected routes */}
                <Route element={<ProtectedRoute allowedRoles={["JOB_SEEKER"]} />}>
                  <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
                  <Route path="/jobseeker/applications" element={<Applications />} />
                  <Route path="/jobseeker/profile" element={<Profile />} />
                  <Route path="/jobseeker/jobs/:id" element={<JobDetails />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
