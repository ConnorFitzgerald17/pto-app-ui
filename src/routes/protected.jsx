import { Navigate, Outlet, Route } from "react-router-dom";
import Navbar from "src/components/nav";
import React from "react";

const ProtectedRoute = ({
  redirect = "/login",
  component: Component,
  ...rest
}) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
