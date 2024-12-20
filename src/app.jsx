import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";

import ForgotRoute from "./routes/forgot";
import LoginRoute from "./routes/login";
import NotFoundRoute from "./routes/not-found";
import ProtectedRoute from "./routes/protected";
import RegisterRoute from "./routes/register";
import ResetRoute from "./routes/reset";
import RootRoute from "./routes/root";
import VerifyRoute from "./routes/verify";
import OrganizationRoute from "./routes/organization";
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
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootRoute />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/organization" element={<OrganizationRoute />} />
        </Route>
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </>
  );
};

export default App;
