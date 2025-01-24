import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useAuth } from "src/hooks/use-auth";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { setLocalStorage } from "src/utils/local-storage";
import { localStorageKeys } from "src/constants/local-storage";
import userThunks from "src/state/user/thunks";
import userService from "src/services/user";

import Button from "src/components/button";
import Input from "src/components/input";
import ErrorBanner from "src/components/error-banner";

const RegisterInviteRoute = () => {
  useAuth({ authRedirect: "/" });
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    userService.verifyInvite(token).then((res) => {
      setOrganization(res.data.name);
    });
  }, [token]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("A first name is required"),
      lastName: Yup.string().required("A last name is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters in length.")
        .required("A password is required."),
    }),
    onSubmit: async (values) => {
      const { password, firstName, lastName } = values;

      dispatch(
        userThunks.registerFromInvite(
          { data: { token, password, firstName, lastName } },
          (err, result) => {
            if (!err) {
              setLocalStorage(localStorageKeys.AUTH_TOKEN, result.token);
              navigate("/");
              return;
            }
            setError(decodeAPIMessage(get(err, "response.data.error", "")));
          },
        ),
      );
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {error && <ErrorBanner message={error} />}
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for Your Account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            You’ve been invited to join{" "}
            <span className="font-bold">{organization}</span> on PTO APP.{" "}
          </p>
          <p className="text-sm text-gray-600 mt-2 text-center">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to="/login"
            >
              Already have an account? Sign in here.
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
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

export default RegisterInviteRoute;
