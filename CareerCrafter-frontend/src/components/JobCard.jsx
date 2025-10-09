import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition mb-4">
      <h3 className="text-lg font-semibold text-blue-600">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{job.companyName}</p>
      <p className="text-gray-700 mb-4">{job.description.substring(0, 150)}...</p>
      <Link
        to={`/job-details/${job.id}`}
        className="text-blue-600 hover:underline font-semibold"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
