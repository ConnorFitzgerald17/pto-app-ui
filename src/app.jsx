import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import { PERMISSIONS } from "./constants/permissions";

import ForgotRoute from "./routes/forgot";
import LoginRoute from "./routes/login";
import NotFoundRoute from "./routes/not-found";
import ProtectedRoute from "./routes/protected";
import RegisterRoute from "./routes/register";
import ResetRoute from "./routes/reset";
import RootRoute from "./routes/root";
import VerifyRoute from "./routes/verify";
import OrganizationRoute from "./routes/organization";
import RegisterInviteRoute from "./routes/register-invite";
import CalendarRoute from "./routes/calendar";
import EditRoleRoute from "./routes/edit-role";
import EditUserRoute from "./routes/edit-user";
const App = () => {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        newestOnTop={true}
        pauseOnHover
        hideProgressBar
      />
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/verify/:token" element={<VerifyRoute />} />
        <Route path="/forgot" element={<ForgotRoute />} />
        <Route path="/reset/:token" element={<ResetRoute />} />
        <Route path="/join/:token" element={<RegisterInviteRoute />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootRoute />} />
        </Route>
        <Route
          element={
            <ProtectedRoute permissions={[PERMISSIONS.MANAGE_ORGANIZATION]} />
          }
        >
          <Route path="/organization" element={<OrganizationRoute />} />
        </Route>
        <Route
          element={
            <ProtectedRoute permissions={[PERMISSIONS.MANAGE_ORGANIZATION]} />
          }
        >
          <Route
            path="/organization/edit-role/:roleId"
            element={<EditRoleRoute />}
          />
          <Route
            path="/organization/edit-role"
            element={<Navigate to="/organization" replace />}
          />
        </Route>
        <Route
          element={
            <ProtectedRoute permissions={[PERMISSIONS.MANAGE_ORGANIZATION]} />
          }
        >
          <Route
            path="/organization/edit-user/:userId"
            element={<EditUserRoute />}
          />
          <Route
            path="/organization/edit-user"
            element={<Navigate to="/organization" replace />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/calendar" element={<CalendarRoute />} />
        </Route>
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </>
  );
};

export default App;
