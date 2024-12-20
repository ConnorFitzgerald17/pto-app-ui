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

import { createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import Button from "src/components/button";
import Input from "src/components/input";
import ErrorBanner from "src/components/error-banner";

const LoginRoute = () => {
  useAuth({ authRedirect: "/" });
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("A valid email address is required.")
        .required("An email is required."),
      password: Yup.string().required("A password is required."),
    }),
    onSubmit: async (values) => {
      dispatch(
        userThunks.login(
          { data: values },
          (err, result) => {
            if (!err) {
              setLocalStorage(localStorageKeys.AUTH_TOKEN, result.token);
              createSuccessToast(toastMessages.LOGIN_SUCCESSFUL);
              navigate("/");
              return;
            }
            setError(decodeAPIMessage(get(err, "response.data.error", "")));
          },
          false,
        ),
      );
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {error && <ErrorBanner message={error} />}

        <div>
          {/* Add your logo here if you have one */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              hasError={formik.touched.email && formik.errors.email}
              error={formik.errors.email}
              placeholder="Email address"
              required
              className="appearance-none rounded-lg relative block w-full"
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
              className="appearance-none rounded-lg relative block w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            fullWidth
          >
            {isLoading ? "Signing in..." : <>Sign in</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginRoute;
