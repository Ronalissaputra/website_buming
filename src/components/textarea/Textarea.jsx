import React from "react";

const Textarea = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="mb-2 block text-lg font-light text-gray-900">
        {label}
      </label>
      <textarea
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full h-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default Textarea;
