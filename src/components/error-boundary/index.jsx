import { useRouteError } from "react-router-dom";
import React from "react";
import * as Sentry from "@sentry/react";

const ErrorBoundary = () => {
  const error = useRouteError();
  Sentry.captureException(error);

  return <div>An error has occured</div>;
};

export default ErrorBoundary;
