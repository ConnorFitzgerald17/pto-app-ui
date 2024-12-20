import React from "react";

const LoadingSpinner = ({ fullScreen = true }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
    : "relative w-full h-full flex items-center justify-center bg-gray-900/50";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
