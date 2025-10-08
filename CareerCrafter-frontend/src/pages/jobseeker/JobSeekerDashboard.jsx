import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getJobs } from "../../api/jobApi";
import JobCard from "../../components/JobCard";
import Sidebar from "../../components/Sidebar";

function JobSeekerDashboard() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const token = localStorage.getItem("token");
        // You can extend this with filters like skills, location, etc.
        const { data } = await getJobs({}, token);
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
      setLoading(false);
    }
    fetchJobs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="JOB_SEEKER" />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Job Seeker Dashboard</h1>
        {loading ? (
          <p className="text-gray-600">Loading available jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-700">No jobs available right now.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} isEmployer={false} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default JobSeekerDashboard;
