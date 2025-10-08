import React, { useEffect, useState, useContext } from "react";
import { getMyApplications } from "../../api/applicationApi";
import ApplicationTable from "../../components/ApplicationTable";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function Applications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await getMyApplications(token);
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch my applications", error);
      }
      setLoading(false);
    }
    fetchApplications();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="JOB_SEEKER" />
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>
        {loading ? (
          <p className="text-gray-600">Loading your applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-700">You have not applied to any jobs yet.</p>
        ) : (
          <ApplicationTable applications={applications} isEmployer={false} />
        )}
      </main>
    </div>
  );
}

export default Applications;
