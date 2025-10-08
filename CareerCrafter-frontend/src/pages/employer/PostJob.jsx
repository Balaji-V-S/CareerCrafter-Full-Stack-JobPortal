import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../api/jobApi";
import { AuthContext } from "../../context/AuthContext";
import { EMPLOYMENT_TYPES } from "../../utils/constants";
import Sidebar from "../../components/Sidebar";
import SkillChips from "../../components/SkillChips";

function PostJob() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: EMPLOYMENT_TYPES[0],
    salary: "",
    industry: "",
    skillsRequired: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addSkill() {
    const skill = skillInput.trim();
    if (skill && !form.skillsRequired.includes(skill)) {
      setForm({ ...form, skillsRequired: [...form.skillsRequired, skill] });
      setSkillInput("");
    }
  }

  function removeSkill(skill) {
    setForm({
      ...form,
      skillsRequired: form.skillsRequired.filter((s) => s !== skill),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || !form.location) {
      setError("Please fill in all mandatory fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...form,
        salary: Number(form.salary),
        employerId: user.id,
      };
      await createJob(payload, token);
      alert("Job posted successfully");
      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="EMPLOYER" />
      <main className="flex-1 p-6 max-w-3xl mx-auto bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-semibold">Job Title *</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Description *</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Location *</span>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Employment Type</span>
            <select
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Salary (₹)</span>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              min="0"
              step="5000"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Industry</span>
            <input
              type="text"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Skills Required</span>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Type and press Enter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <SkillChips skills={form.skillsRequired} onRemove={removeSkill} />
          </label>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Post Job
          </button>
        </form>
      </main>
    </div>
  );
}

export default PostJob;
