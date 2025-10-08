import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job, isEmployer }) {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
      <p className="text-gray-600 mb-1">{job.companyName || job.employer?.companyName}</p>
      <p className="text-gray-700 mb-2">
        {job.location} | {job.employmentType.replaceAll("_", " ")}
      </p>
      <div className="mb-2">
        {job.skillsRequired?.map((skill, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs mr-2 mb-2"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="font-medium mb-2">Salary: ₹{job.salary}</p>
      <Link
        to={isEmployer ? `/employer/joblistings/${job.id}` : `/jobseeker/jobs/${job.id}`}
        className="text-indigo-600 hover:underline font-semibold"
      >
        View
      </Link>
    </div>
  );
}

export default JobCard;
