import React, { useEffect, useState, useContext } from "react";
import { getJobSeekerProfileById } from "../../api/jobSeekerApi";
import { AuthContext } from "../../context/AuthContext";

const JobSeekerDashboard = () => {
  const { user } = useContext(AuthContext); // Extract logged-in user info with ID
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getJobSeekerProfileById(user.id); // Pass user id here
        setProfile(data);
      } catch (error) {
        console.error("Failed to load job seeker profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user?.id]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10">No profile found. Please create your profile.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
        Welcome, {profile.name}
      </h1>
      <p className="mb-2 text-gray-700">Email: {profile.email}</p>
      <p className="mb-2 text-gray-700">Education: {profile.education || "N/A"}</p>
      <p className="mb-2 text-gray-700">Work Experience: {profile.workExperience || "N/A"}</p>
      <p className="mb-2 text-gray-700">Skills: {(profile.skills || []).join(", ") || "N/A"}</p>
      <p className="text-gray-700">
        Use the menu to search jobs, apply, and manage your applications.
      </p>
    </div>
  );
};

export default JobSeekerDashboard;
