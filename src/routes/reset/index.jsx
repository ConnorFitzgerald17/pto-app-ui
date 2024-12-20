import { Link, useParams } from "react-router-dom";
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

const ResetRoute = () => {
  useAuth({ authRedirect: "/" });
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters in length.")
        .required("A password is required."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
        .required("Passwords must match."),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        password: values.password,
        token,
      };
      try {
        const result = await userService.reset(payload);
        const message = get(result, "data.message");

        if (message && message === "user.reset.success") {
          setSuccess(
            "Password has been successfully changed, you may now login."
          );
          setError(false);
        } else {
          setError(decodeAPIMessage(""));
          setSuccess(false);
        }
      } catch (err) {
        const message = get(err, "response.data.error", "");
        setError(decodeAPIMessage(message));
        setSuccess(false);
      }
      resetForm();
    },
  });

  return (
    <div className="max-w-md p-10">
      {success && <SuccessBanner message={success} />}
      {error && <ErrorBanner message={error} />}
      <h1 className="text-xl">Reset Password</h1>
      <div>
        <form>
          <Input
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            hasError={formik.touched.password && formik.errors.password}
            error={formik.errors.password}
            placeholder="New Password"
            required
          />
          <Input
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            hasError={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            error={formik.errors.confirmPassword}
            placeholder="Confirm New Password"
            required
          />
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            className="mt-2"
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </div>
      <Link className="text-indigo-500" to="/login">
        Remember password? Login instead
      </Link>
    </div>
  );
};

export default ResetRoute;
