import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup"; // Recommended for validation

import orgThunks from "src/state/org/thunks";
import rolesThunks from "src/state/role/thunks";
import LoadingSpinner from "src/components/loading-spinner";
import ConfirmDialog from "src/components/confirm";
import ErrorBanner from "src/components/error-banner";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";
import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { PERMISSIONS } from "src/constants/permissions";
import userThunks from "src/state/user/thunks";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  roleId: Yup.string().required("Role is required"),
  isVerified: Yup.boolean(),
});

const EditUser = ({ fetchUsers }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [error, setError] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userId);

  const user = useSelector((state) => state.org.orgUser);
  const userLoading = useSelector((state) => state.org.isLoading);
  const roles = useSelector((state) => state.roles.roles);
  const currentUser = useSelector((state) => state.user.details);

  useEffect(() => {
    dispatch(orgThunks.getOrgUser({ data: { userId } }));
    dispatch(rolesThunks.getRoles());
  }, [dispatch, userId]);

  useEffect(() => {
    if (currentUser.userId === userId) {
      setFilteredRoles(
        roles.filter((role) =>
          role.permissions.includes(PERMISSIONS.MANAGE_ORGANIZATION),
        ),
      );
    } else {
      setFilteredRoles(roles);
    }
  }, [currentUser, roles]);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      roleId: user?.role?.roleId || "",
      isVerified: user?.isVerified || false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (JSON.stringify(values) === JSON.stringify(formik.initialValues)) {
        return;
      }
      try {
        dispatch(
          orgThunks.updateOrgUser(
            { data: values, userId },
            (err) => {
              if (!err) {
                createSuccessToast(toastMessages.UPDATE_USER_SUCCESSFUL);
                navigate("/organization", { state: { activeTab: "Users" } });
                dispatch(userThunks.getUser());
                return;
              }
              setError(decodeAPIMessage(get(err, "response.data.error", "")));
            },
            false,
          ),
        );
      } catch (error) {
        createErrorToast(toastMessages.UPDATE_USER_ERROR);
      }
    },
    enableReinitialize: true,
  });

  const handleConfirm = () => {
    formik.setFieldValue("isDefault", true);
    setIsConfirmDialogOpen(false);
  };

  if (!userId) {
    navigate("/organization");
  }

  if (!user || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Set as Default Role"
        message="Are you sure you want to set this as the default role? This will remove the current default role and make this the new default for your organization. All new users will be assigned this role by default."
      />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
            <p className="mt-2 text-sm text-gray-600">
              Update the user&apos;s information and role assignment.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {error && <ErrorBanner message={error} />}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="roleId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="roleId"
                  name="roleId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.roleId}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a role</option>
                  {filteredRoles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {formik.touched.roleId && formik.errors.roleId && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.roleId}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/organization", { state: { activeTab: "Users" } })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={userLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {userLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
