import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobApplications, updateApplicationStatus } from "../../api/applicationApi";
import ApplicationTable from "../../components/ApplicationTable";

function ViewApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await getJobApplications(jobId, token);
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
      setLoading(false);
    }
    fetchApplications();
  }, [jobId]);

  async function handleStatusUpdate(applicationId, newStatus) {
    try {
      const token = localStorage.getItem("token");
      await updateApplicationStatus(applicationId, { status: newStatus }, token);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      alert("Failed to update application status");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Applications for Job #{jobId}</h1>
        {loading ? (
          <p className="text-gray-600">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-700">No applications for this job yet.</p>
        ) : (
          <ApplicationTable
            applications={applications}
            isEmployer={true}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default ViewApplications;
