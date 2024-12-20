/* eslint-disable no-unused-vars */
import { Navigate, Outlet, Route } from "react-router-dom";
import Navbar from "src/components/nav";
import VerifyBanner from "src/components/verify-banner";
import React from "react";
import { useSelector } from "react-redux";
import { checkPermissions } from "src/utils/check-permissions";
const ProtectedRoute = ({
  redirect = "/login",
  component: Component,
  ...rest
}) => {
  const userDetails = useSelector((state) => state.user.details);
  const { permissions } = rest;

  if (permissions && permissions.length > 0) {
    const hasPermission = checkPermissions(
      userDetails?.role?.permissions,
      permissions,
    );

    if (!hasPermission) {
      return <Navigate to="/" />;
    }
  }

  return (
    <>
      <Navbar />
      <VerifyBanner />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
