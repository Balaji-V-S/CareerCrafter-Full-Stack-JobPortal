import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { fetchApplicationsBySeeker, updateApplicationStatus } from "../../api/applicationApi";

const ViewApplications = () => {
  const { user } = useContext(AuthContext); // Get logged in user from context
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seekerId = user?.id; // Dynamically get seeker id from logged-in user

  const loadApplications = async () => {
    if (!seekerId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    try {
      const data = await fetchApplicationsBySeeker(seekerId);
      setApplications(data);
    } catch {
      setError("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [seekerId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch {
      alert("Failed to update application status.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading applications...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">View Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md"
            >
              <h2 className="text-xl font-semibold mb-1">
                {app.jobTitle} - {app.applicantName}
              </h2>
              <p className="mb-2">Status: {app.status}</p>

              <div className="space-x-4">
                {["PENDING", "APPROVED", "REJECTED"].map((status) => (
                  <button
                    key={status}
                    disabled={app.status === status}
                    onClick={() => handleStatusChange(app.id, status)}
                    className={`px-3 py-1 rounded text-white ${
                      status === "APPROVED"
                        ? "bg-green-600 hover:bg-green-700"
                        : status === "REJECTED"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    } disabled:opacity-50`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
