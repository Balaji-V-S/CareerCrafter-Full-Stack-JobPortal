import React, { useEffect, useState } from "react";
import { fetchJobById } from "../../api/jobApi";
import { applyJob } from "../../api/applicationApi";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await applyJob({ jobId: id });
      setApplied(true);
    } catch {
      alert("Failed to apply for job.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading job details...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  if (!job) return <div className="text-center mt-10">Job not found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">{job.title}</h1>
      <p className="mb-2 text-gray-700">{job.description}</p>
      <p className="mb-2 text-gray-700"><strong>Qualifications:</strong> {job.qualifications}</p>
      <p className="mb-2 text-gray-700"><strong>Location:</strong> {job.location}</p>
      <p className="mb-6 text-gray-700"><strong>Salary:</strong> {job.salary}</p>
      <button
        onClick={handleApply}
        disabled={applying || applied}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
      >
        {applied ? "Applied" : applying ? "Applying..." : "Apply"}
      </button>
    </div>
  );
};

export default JobDetails;
