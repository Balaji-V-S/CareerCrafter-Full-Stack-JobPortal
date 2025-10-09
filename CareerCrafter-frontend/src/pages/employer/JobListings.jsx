import React, { useEffect, useState } from "react";
import { fetchUserInfo } from "../../api/userApi";

const EmployerDashboard = () => {
  const [employerInfo, setEmployerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserInfo();
        setEmployerInfo(data);
      } catch (error) {
        console.error("Failed to fetch employer info:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!employerInfo) {
    return <div className="text-center mt-10">No employer data found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
        Welcome, {employerInfo.name}
      </h1>
      <p className="text-gray-700 mb-2">
        Company: {employerInfo.companyName || "Not provided"}
      </p>
      <p className="text-gray-700 mb-2">Email: {employerInfo.email}</p>
      <p className="text-gray-700">
        You can post and manage job listings from the menu.
      </p>
    </div>
  );
};

export default EmployerDashboard;
