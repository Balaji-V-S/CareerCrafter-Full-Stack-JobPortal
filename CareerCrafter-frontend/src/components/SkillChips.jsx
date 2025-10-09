import React from "react";

const SkillChips = ({ skills = [] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillChips;
