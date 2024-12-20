import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import get from "lodash/get";
import React, { useState } from "react";
import * as Yup from "yup";

import { useAuth } from "src/hooks/use-auth";

import { decodeAPIMessage } from "src/utils/decode-api-message";
import Button from "src/components/button";
import Input from "src/components/input";
import ErrorBanner from "src/components/error-banner";
import userService from "src/services/user";
import SuccessBanner from "src/components/success-banner";

const ForgotRoute = () => {
  useAuth({ authRedirect: "/" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("A valid email address is required.")
        .required("An email is required."),
    }),
    onSubmit: async (values) => {
      try {
        const result = await userService.requestReset(values);
        const message = get(result, "data.message");

        if (message && message === "user.reset.requested") {
          setSuccess(
            "Request sent. If an email matches the one provided, you'll receive an email with reset instructions shortly."
          );
          setError(false);
        } else {
          setError(decodeAPIMessage(""));
          setSuccess(false);
        }
      } catch (err) {
        setError(decodeAPIMessage(""));
        setSuccess(false);
      }
    },
  });

  return (
    <div className="max-w-md p-10">
      {success && <SuccessBanner message={success} />}
      {error && <ErrorBanner message={error} />}
      <h1 className="text-xl">Forgot Password</h1>
      <div>
        <form>
          <Input
            type="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            hasError={formik.touched.email && formik.errors.email}
            error={formik.errors.email}
            placeholder="Email"
            required
          />
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            className="mt-2"
            fullWidth
          >
            Request Reset
          </Button>
        </form>
      </div>
      <Link className="text-indigo-500" to="/login">
        Remember password? Login instead
      </Link>
    </div>
  );
};

export default ForgotRoute;
