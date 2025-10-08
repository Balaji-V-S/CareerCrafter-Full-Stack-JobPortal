import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getJobDetails } from "../../api/jobApi";
import { applyToJob } from "../../api/applicationApi";
import { AuthContext } from "../../context/AuthContext";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJob() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await getJobDetails(id, token);
        setJob(data);
      } catch {
        setError("Failed to load job details");
      }
      setLoading(false);
    }
    fetchJob();
  }, [id]);

  async function handleApply() {
    setError("");
    try {
      const token = localStorage.getItem("token");
      await applyToJob(id, {}, token); // Assuming no extra payload needed
      setApplicationStatus("Applied");
      alert("Application submitted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply");
    }
  }

  if (loading)
    return <p className="text-center text-gray-600 mt-16">Loading job details...</p>;
  if (!job)
    return <p className="text-center text-red-600 mt-16">Job not found.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="mb-1">
        <strong>Company:</strong> {job.employer?.companyName}
      </p>
      <p className="mb-1">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="mb-1">
        <strong>Employment Type:</strong> {job.employmentType.replaceAll("_", " ")}
      </p>
      <p className="mb-4">
        <strong>Salary:</strong> ₹{job.salary}
      </p>
      <div className="mb-4">
        <strong>Description:</strong>
        <p className="mt-1">{job.description}</p>
      </div>
      <div className="mb-6">
        <strong>Skills Required:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.skillsRequired?.map((s, i) => (
            <span
              key={i}
              className="bg-gray-200 rounded-full px-3 py-1 text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      {applicationStatus !== "Applied" ? (
        <button
          onClick={handleApply}
          disabled={!user || user.role !== "JOB_SEEKER"}
          className={`px-6 py-2 rounded font-semibold text-white transition ${
            !user || user.role !== "JOB_SEEKER"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Apply
        </button>
      ) : (
        <p className="text-green-600 font-semibold">You have applied to this job.</p>
      )}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </section>
  );
}

export default JobDetails;
