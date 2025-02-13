import React from "react";

const NoContentState = ({ onClick, message, buttonText }) => {
  return (
    <div className="rounded-lg bg-white p-8 text-center shadow">
      <p className="text-gray-500">{message}</p>
      <button
        onClick={onClick}
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NoContentState;
