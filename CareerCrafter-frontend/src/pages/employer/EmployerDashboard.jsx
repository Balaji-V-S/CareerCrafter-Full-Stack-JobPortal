import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getJobs } from "../../api/jobApi";
import JobCard from "../../components/JobCard";
import Sidebar from "../../components/Sidebar";

function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      if (!user) return;
      try {
        const token = localStorage.getItem("token");
        const { data } = await getJobs({ employerId: user.id }, token);
        setJobListings(data);
      } catch (error) {
        console.error("Failed to fetch employer jobs", error);
      }
      setLoading(false);
    }
    fetchJobs();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="EMPLOYER" />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
        {loading ? (
          <p className="text-gray-600">Loading your job listings...</p>
        ) : jobListings.length === 0 ? (
          <p className="text-gray-700">
            You have not posted any jobs yet.{" "}
            <a href="/employer/postjob" className="text-indigo-600 hover:underline">
              Post your first job
            </a>.
          </p>
        ) : (
          <div className="space-y-4">
            {jobListings.map((job) => (
              <JobCard key={job.id} job={job} isEmployer />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default EmployerDashboard;
