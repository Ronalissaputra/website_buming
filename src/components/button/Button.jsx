import React from "react";

const Button = ({ onClick, children, type }) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className="my-4 w-full rounded-md bg-indigo-600 px-4 py-2 font-light text-slate-100 md:w-1/2"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
