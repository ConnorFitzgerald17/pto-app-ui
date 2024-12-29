/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "src/components/nav/sidebar";
import VerifyBanner from "src/components/verify-banner";
import React from "react";
import { useSelector } from "react-redux";
import { checkPermissions } from "src/utils/check-permissions";
import LoadingSpinner from "src/components/loading-spinner";
import { useAuth } from "src/hooks/use-auth";

// New custom hook for permission checking
const usePermissionCheck = (userDetails, permissions) => {
  if (!userDetails) return { loading: true, hasPermission: false };

  if (permissions && permissions.length > 0) {
    const hasPermission = checkPermissions(
      userDetails?.role?.permissions,
      permissions,
    );
    return { loading: false, hasPermission };
  }

  return { loading: false, hasPermission: true };
};

const ProtectedRoute = ({
  redirect = "/login",
  component: Component,
  ...rest
}) => {
  useAuth({});
  const userDetails = useSelector((state) => state.user.details);
  const onboardingRequired = useSelector(
    (state) => state.user.onboardingRequired,
  );
  const { permissions } = rest;

  const { loading, hasPermission } = usePermissionCheck(
    userDetails,
    permissions,
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (onboardingRequired && window.location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  if (!hasPermission) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Sidebar />

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <VerifyBanner />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ProtectedRoute;
