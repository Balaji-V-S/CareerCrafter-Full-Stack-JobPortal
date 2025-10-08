import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-4 text-red-600">Unauthorized Access</h2>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Go to Home
      </Link>
    </section>
  );
}

export default Unauthorized;
