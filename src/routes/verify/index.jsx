import { Link, useParams } from "react-router-dom";
import get from "lodash/get";
import React, { useEffect, useState } from "react";
import userService from "src/services/user";

const statuses = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
};
// TODO: Different link for login vs not logged in
const VerifyRoute = () => {
  const { token } = useParams();
  const [status, setStatus] = useState(statuses.LOADING);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await userService.verify(token);
        // If we get here without throwing, it's successful
        setStatus(statuses.SUCCESS);
      } catch (err) {
        const message = get(err, "response.data.error", "");

        // Still successful if user is already verified
        if (message === "user.verify.user.verified") {
          setStatus(statuses.SUCCESS);
        } else {
          setStatus(statuses.FAILED);
        }
      }
    };

    verifyToken();
    // eslint-disable-next-line
  }, []);

  if (status === statuses.SUCCESS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4 bg-white p-8 rounded-lg shadow-md text-center">
          <div className="rounded-full h-12 w-12 bg-green-100 mx-auto flex items-center justify-center">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
          <p className="text-gray-600">
            Your email has been successfully verified. You may now{" "}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to="/login"
            >
              login
            </Link>{" "}
            to your account.
          </p>
        </div>
      </div>
    );
  }

  if (status === statuses.FAILED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4 bg-white p-8 rounded-lg shadow-md text-center">
          <div className="rounded-full h-12 w-12 bg-red-100 mx-auto flex items-center justify-center">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Verification Failed
          </h2>
          <p className="text-gray-600">
            Email verification failed. Your token is either invalid or has
            expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4 bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="text-gray-600">Verifying your email...</p>
      </div>
    </div>
  );
};

export default VerifyRoute;
