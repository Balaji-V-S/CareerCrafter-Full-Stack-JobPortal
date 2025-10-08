import React, { useState, useContext, useEffect } from "react";
import { getProfile, updateProfile, uploadResume } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import FileUpload from "../../components/FileUpload";
import SkillChips from "../../components/SkillChips";

function Profile() {
  const { user, updateUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    skills: [],
    education: "",
    workExperience: "",
    coCurricularDetails: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await getProfile(token);
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          address: data.address || "",
          skills: data.skills || [],
          education: data.education || "",
          workExperience: data.workExperience || "",
          coCurricularDetails: data.coCurricularDetails || "",
        });
      } catch (err) {
        setError("Failed to load profile");
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addSkill(skill) {
    if (skill && !form.skills.includes(skill)) {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  }

  function removeSkill(skill) {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await updateProfile(form, token);
      alert("Profile updated successfully");
      updateUser({ ...user, ...form }); // update context
    } catch {
      setError("Failed to update profile");
    }
  }

  async function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await uploadResume(file, token);
      alert("Resume uploaded successfully");
    } catch {
      setError("Failed to upload resume");
    }
    setUploading(false);
  }

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-16">Loading profile...</p>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="JOB_SEEKER" />
      <main className="flex-1 p-6 max-w-3xl mx-auto bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-semibold">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Email (readonly)</span>
            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Phone</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Address</span>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Skills</span>
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill(e.target.value.trim());
                  e.target.value = "";
                }
              }}
              placeholder="Type a skill and press Enter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <SkillChips skills={form.skills} onRemove={removeSkill} />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Education</span>
            <textarea
              name="education"
              value={form.education}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              rows={3}
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Work Experience</span>
            <textarea
              name="workExperience"
              value={form.workExperience}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              rows={3}
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Co-Curricular Details</span>
            <textarea
              name="coCurricularDetails"
              value={form.coCurricularDetails}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              rows={3}
            />
          </label>

          <FileUpload
            label="Upload Resume (PDF, DOC)"
            onChange={handleResumeUpload}
            accept=".pdf,.doc,.docx"
          />

          {uploading && (
            <p className="text-indigo-600 font-semibold">Uploading resume...</p>
          )}

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Update Profile
          </button>
        </form>
      </main>
    </div>
  );
}

export default Profile;
