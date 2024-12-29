import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import { PERMISSIONS_NEW } from "./constants/permissions";

// Misc routes
import NotFoundRoute from "./routes/not-found";
import ProtectedRoute from "./routes/protected";
import RootRoute from "./routes/root";

// User routes
import ResetRoute from "./routes/reset";
import VerifyRoute from "./routes/verify";
import RegisterInviteRoute from "./routes/register-invite";
import OnboardingRoute from "./routes/onboarding";
import RegisterRoute from "./routes/register";
import ForgotRoute from "./routes/forgot";
import LoginRoute from "./routes/login";
import CalendarRoute from "./routes/calendar";

// Admin routes
import ReportsRoute from "./routes/reports";
import UserRoute from "./routes/user";
import PolicyRoute from "./routes/policy";
import DepartmentRoute from "./routes/department";
import OrganizationRoute from "./routes/organization";
import AnalyticsRoute from "./routes/analytics";
import ExportRoute from "./routes/export";
import SystemRoute from "./routes/system";

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
          <Route path="/onboarding" element={<OnboardingRoute />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootRoute />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              permissions={[PERMISSIONS_NEW.MANAGE_ORGANIZATION]}
            />
          }
        >
          <Route path="/organization" element={<OrganizationRoute />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/user"
            element={<UserRoute />}
            permissions={[
              PERMISSIONS_NEW.MANAGE_USERS,
              PERMISSIONS_NEW.MANAGE_ROLES,
              PERMISSIONS_NEW.INVITE_USERS,
            ]}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/policy"
            element={<PolicyRoute />}
            permissions={[
              PERMISSIONS_NEW.MANAGE_POLICIES,
              PERMISSIONS_NEW.VIEW_ALL_POLICIES,
              PERMISSIONS_NEW.MANAGE_DEPARTMENT_POLICIES,
            ]}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/department"
            element={<DepartmentRoute />}
            permissions={[
              PERMISSIONS_NEW.MANAGE_DEPARTMENTS,
              PERMISSIONS_NEW.VIEW_DEPARTMENT,
            ]}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/reports"
            element={<ReportsRoute />}
            permissions={[PERMISSIONS_NEW.VIEW_REPORTS]}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/analytics"
            element={<AnalyticsRoute />}
            permissions={[PERMISSIONS_NEW.VIEW_ANALYTICS]}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/export"
            element={<ExportRoute />}
            permissions={[PERMISSIONS_NEW.EXPORT_PTO_DATA]}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/system"
            element={<SystemRoute />}
            permissions={[PERMISSIONS_NEW.VIEW_SYSTEM_LOGS]}
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
