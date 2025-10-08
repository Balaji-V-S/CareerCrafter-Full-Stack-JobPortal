import React from "react";

function SkillChips({ skills = [], onRemove }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span
          className="bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center space-x-2"
          key={idx}
        >
          <span>{skill}</span>
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="text-gray-600 hover:text-red-600 font-bold focus:outline-none"
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}

export default SkillChips;
