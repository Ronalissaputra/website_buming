import React from "react";

const Select = ({ label, name, value, onChange, options, pilih }) => {
  return (
    <div>
      <label className="mb-2 block text-lg font-light text-gray-900">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
        required
      >
        <option value="">{pilih}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
