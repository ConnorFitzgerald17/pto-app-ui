import React from "react";
import { Link } from "react-router-dom";

const NotFoundRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-5">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundRoute;
