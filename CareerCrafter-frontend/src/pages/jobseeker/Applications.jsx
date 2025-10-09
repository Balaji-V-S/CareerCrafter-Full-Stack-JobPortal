import React, { useEffect, useState } from "react";
import { fetchApplicationsBySeeker } from "../../api/applicationApi";
import ApplicationTable from "../../components/ApplicationTable";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplications = async () => {
    try {
      const data = await fetchApplications();
      setApplications(data);
    } catch {
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleWithdraw = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;
    try {
      await withdrawApplication(id);
      setApplications(applications.filter((app) => app.id !== id));
    } catch {
      alert("Failed to withdraw application.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading applications...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{app.jobTitle}</h2>
                <p className="text-gray-700">Status: {app.status}</p>
              </div>
              <button
                onClick={() => handleWithdraw(app.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Withdraw
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
