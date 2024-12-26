import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";
import App from "./app.jsx";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY,
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
