import React from "react";

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="mb-2 block text-lg font-light text-gray-900">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default Input;
