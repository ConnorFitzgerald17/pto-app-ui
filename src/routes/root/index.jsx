import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import React from "react";

import { removeLocalStorage } from "src/utils/local-storage";
import { localStorageKeys } from "src/constants/local-storage";
import { useAuth } from "src/hooks/use-auth";
import { createErrorToast, createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import Button from "src/components/button";
import userActions from "src/state/user/actions";
import userService from "src/services/user";

// Mock data (you can move this to a separate file)
const statsData = [
  { label: "Total Users", value: "1,234", change: "+12%", trend: "up" },
  { label: "Active Projects", value: "45", change: "+5%", trend: "up" },
  { label: "Tasks Completed", value: "89%", change: "-2%", trend: "down" },
  { label: "Revenue", value: "$12,345", change: "+8%", trend: "up" },
];

const recentActivity = [
  { id: 1, user: "John Doe", action: "Completed task", time: "2 hours ago" },
  {
    id: 2,
    user: "Jane Smith",
    action: "Created new project",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Updated status",
    time: "5 hours ago",
  },
  { id: 4, user: "Sarah Wilson", action: "Added comment", time: "1 day ago" },
];

const RootRoute = () => {
  useAuth({ unauthRedirect: "/login" });
  const isLoading = useSelector((state) => state.user.isLoading);
  const userDetails = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.resetAuth());
    createSuccessToast(toastMessages.LOGOUT_SUCCESSFUL);
    removeLocalStorage(localStorageKeys.AUTH_TOKEN);
    navigate("/login");
  };

  const handleResend = async () => {
    try {
      await userService.resendVerification();
      createSuccessToast(toastMessages.VERIFY_RESEND_SUCCESSFUL);
    } catch (err) {
      const status = get(err, "response.status", 500);
      if (status === 401) {
        dispatch(userActions.resetAuth());
        createErrorToast(toastMessages.UNAUTHORIZED);
        removeLocalStorage(localStorageKeys.AUTH_TOKEN);
        navigate("/login");
      } else {
        createErrorToast(toastMessages.ERROR);
      }
    }
  };

  if (isLoading || !userDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {userDetails.firstName}!
          </p>
        </div>
        <div className="space-x-4">
          {!userDetails.isVerified && (
            <Button onClick={handleResend}>Resend Verification</Button>
          )}
          <Button variant="tertiary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <span
                className={`ml-2 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Analytics Overview
          </h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootRoute;
