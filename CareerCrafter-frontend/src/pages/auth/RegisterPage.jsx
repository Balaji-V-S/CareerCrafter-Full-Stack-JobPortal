import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("JOB_SEEKER");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyDesc: "",
    website: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      role,
      name: form.name,
      email: form.email,
      password: form.password,
      ...(role === "EMPLOYER"
        ? {
            companyName: form.companyName,
            companyDesc: form.companyDesc,
            website: form.website,
          }
        : {
            phone: form.phone,
            address: form.address,
          }),
    };

    try {
      await register(payload);
      alert("Registration successful! Please login.");
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Role</span>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="JOB_SEEKER">Job Seeker</option>
            <option value="EMPLOYER">Employer</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Your email address"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Confirm Password</span>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </label>

        {role === "EMPLOYER" && (
          <>
            <label className="block">
              <span className="text-gray-700">Company Name</span>
              <input
                name="companyName"
                type="text"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Company Description</span>
              <textarea
                name="companyDesc"
                value={form.companyDesc}
                onChange={handleChange}
                placeholder="Brief description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Website</span>
              <input
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
          </>
        )}

        {role === "JOB_SEEKER" && (
          <>
            <label className="block">
              <span className="text-gray-700">Phone</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Address</span>
              <input
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="Your address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
          </>
        )}
        {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-indigo-600 hover:underline">
          Login here
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
