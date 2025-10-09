import React, { useState, useEffect } from "react";
import { postJob, fetchJobById, updateJob } from "../../api/jobApi";
import { useNavigate, useLocation } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const editJobId = searchParams.get("edit");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editJobId) {
      const loadJob = async () => {
        setLoading(true);
        try {
          const data = await fetchJobById(editJobId);
          setFormData({
            title: data.title,
            description: data.description,
            qualifications: data.qualifications,
            location: data.location,
            salary: data.salary,
          });
        } catch {
          setError("Failed to load job data.");
        } finally {
          setLoading(false);
        }
      };
      loadJob();
    }
  }, [editJobId]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (editJobId) {
        await updateJob(editJobId, formData);
      } else {
        await postJob(formData);
      }
      navigate("/employer/job-listings");
    } catch {
      setError("Failed to save job.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">
        {editJobId ? "Edit Job" : "Post New Job"}
      </h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Qualifications</label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Saving..." : editJobId ? "Update Job" : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
