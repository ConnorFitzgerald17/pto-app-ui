import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import React, { useState } from "react";
import * as Yup from "yup";

import { useAuth } from "src/hooks/use-auth";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { setLocalStorage } from "src/utils/local-storage";
import { localStorageKeys } from "src/constants/local-storage";
import userThunks from "src/state/user/thunks";

import Button from "src/components/button";
import Input from "src/components/input";
import ErrorBanner from "src/components/error-banner";

const RegisterRoute = () => {
  useAuth({ authRedirect: "/" });
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      organizationName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("A first name is required"),
      lastName: Yup.string().required("A last name is required"),
      email: Yup.string()
        .email("A valid email address is required.")
        .required("An email is required."),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters in length.")
        .required("A password is required."),
      organizationName: Yup.string().required(
        "An organization name is required",
      ),
    }),
    onSubmit: async (values) => {
      dispatch(
        userThunks.register({ data: values }, (err, result) => {
          if (!err) {
            setLocalStorage(localStorageKeys.AUTH_TOKEN, result.token);
            navigate("/onboarding");
            return;
          }
          setError(decodeAPIMessage(get(err, "response.data.error", "")));
        }),
      );
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {error && <ErrorBanner message={error} />}
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to="/login"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              id="organizationName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organizationName}
              hasError={
                formik.touched.organizationName &&
                formik.errors.organizationName
              }
              error={formik.errors.organizationName}
              placeholder="Organization Name"
              required
              className="appearance-none rounded-md relative block w-full"
            />
            <Input
              type="text"
              id="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              hasError={formik.touched.firstName && formik.errors.firstName}
              error={formik.errors.firstName}
              placeholder="First Name"
              required
              className="appearance-none rounded-md relative block w-full"
            />
            <Input
              type="text"
              id="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              hasError={formik.touched.lastName && formik.errors.lastName}
              error={formik.errors.lastName}
              placeholder="Last Name"
              required
              className="appearance-none rounded-md relative block w-full"
            />
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
              className="appearance-none rounded-md relative block w-full"
            />
            <Input
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              hasError={formik.touched.password && formik.errors.password}
              error={formik.errors.password}
              placeholder="Password"
              required
              className="appearance-none rounded-md relative block w-full"
            />
          </div>

          <Button
            type="submit"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            fullWidth
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterRoute;
