import React from "react";
import { APPLICATION_STATUSES } from "../utils/constants";

function ApplicationTable({ applications, isEmployer, onStatusUpdate }) {
  return (
    <table className="min-w-full border border-gray-300 border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 p-2 text-left">Job Title</th>
          {isEmployer && (
            <th className="border border-gray-300 p-2 text-left">Candidate</th>
          )}
          <th className="border border-gray-300 p-2 text-left">Status</th>
          <th className="border border-gray-300 p-2 text-left">Applied At</th>
          {isEmployer && (
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">{app.jobListing?.title}</td>
            {isEmployer && (
              <td className="border border-gray-300 p-2">
                {app.jobSeeker?.name} ({app.jobSeeker?.email})
              </td>
            )}
            <td className="border border-gray-300 p-2">{app.status}</td>
            <td className="border border-gray-300 p-2">
              {new Date(app.appliedAt).toLocaleString()}
            </td>
            {isEmployer && (
              <td className="border border-gray-300 p-2">
                <select
                  value={app.status}
                  onChange={(e) => onStatusUpdate(app.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {APPLICATION_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationTable;
