import { Navigate, Outlet, Route } from "react-router-dom";
import Navbar from "src/components/nav";
import VerifyBanner from "src/components/verify-banner";
import React from "react";

const ProtectedRoute = ({
  redirect = "/login",
  component: Component,
  ...rest
}) => {
  return (
    <>
      <Navbar />
      <VerifyBanner />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
