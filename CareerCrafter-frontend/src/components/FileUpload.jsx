import React from "react";

function FileUpload({ label, onChange, accept = "*" }) {
  return (
    <div className="my-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
      </label>
    </div>
  );
}

export default FileUpload;
