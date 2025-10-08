import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getJobs, deleteJob } from "../../api/jobApi";
import JobCard from "../../components/JobCard";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

function JobListings() {
  const { user } = useContext(AuthContext);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      if (!user) return;
      try {
        const token = localStorage.getItem("token");
        const { data } = await getJobs({ employerId: user.id }, token);
        setJobListings(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
      setLoading(false);
    }
    fetchJobs();
  }, [user]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteJob(id, token);
      setJobListings((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      alert("Failed to delete job");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="EMPLOYER" />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">My Job Listings</h1>
        {loading ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : jobListings.length === 0 ? (
          <p className="text-gray-700">
            You have no job listings.{" "}
            <a href="/employer/postjob" className="text-indigo-600 hover:underline">
              Post a job
            </a>.
          </p>
        ) : (
          <ul className="space-y-4">
            {jobListings.map((job) => (
              <li key={job.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <JobCard job={job} isEmployer />
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate(`/employer/viewapplications/${job.id}`)}
                    className="bg-indigo-600 text-white rounded px-3 py-1 hover:bg-indigo-700"
                  >
                    View Applications
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default JobListings;
