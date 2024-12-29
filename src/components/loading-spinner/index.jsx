import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
