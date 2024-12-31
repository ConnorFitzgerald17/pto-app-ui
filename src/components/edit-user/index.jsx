import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup"; // Recommended for validation
import DialogParent from "src/components/dialog";

import orgThunks from "src/state/org/thunks";
import LoadingSpinner from "src/components/loading-spinner";
import ErrorBanner from "src/components/error-banner";
import InputField from "src/components/input";

import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";
import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import userThunks from "src/state/user/thunks";
import UserRoleSelect from "src/components/user-role-select";
import DepartmentSelect from "src/components/department-select";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  roleId: Yup.string().required("Role is required"),
  departmentId: Yup.string().required("Department is required"),
});

const EditUser = ({ isOpen, onClose, userId }) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.org.orgUser);
  const userLoading = useSelector((state) => state.org.isLoading);

  useEffect(() => {
    if (userId) {
      dispatch(orgThunks.getOrgUser({ data: { userId } }));
    }
  }, [dispatch, userId]);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      roleId: user?.role?.roleId || "",
      isVerified: user?.isVerified || false,
      policyIds: user?.policyIds || [],
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
                dispatch(userThunks.getUser());
                dispatch(orgThunks.getOrgUsers());
                onClose();
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

  const handleRoleChange = (value) => {
    formik.setFieldValue("roleId", value);
  };

  const handleDepartmentChange = (value) => {
    formik.setFieldValue("departmentId", value);
  };

  if (!user || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DialogParent
      title="Edit User"
      description="Update the user's information and role assignment."
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className="space-y-6">
        {error && <ErrorBanner message={error} />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <InputField
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
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
              <InputField
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
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
            <InputField
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <UserRoleSelect
              value={formik.values.roleId}
              onChange={handleRoleChange}
            />
            {formik.touched.roleId && formik.errors.roleId && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.roleId}
              </div>
            )}
          </div>
          {/* We can implement later if we need to */}
          {/* <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              PTO Policies
            </label>
            <div className="mt-2 space-y-2">
              {policies &&
                policies.map((policy) => (
                  <div key={policy.policyId} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`policy-${policy.policyId}`}
                      name="policyIds"
                      value={policy.policyId}
                      checked={formik.values.policyIds.includes(
                        policy.policyId,
                      )}
                      onChange={(e) => {
                        const newPolicyIds = e.target.checked
                          ? [...formik.values.policyIds, policy.policyId]
                          : formik.values.policyIds.filter(
                              (id) => id !== policy.policyId,
                            );
                        formik.setFieldValue("policyIds", newPolicyIds);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`policy-${policy.policyId}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {policy.name}
                    </label>
                  </div>
                ))}
            </div>
          </div> */}
          <div>
            <DepartmentSelect
              value={formik.values.departmentId}
              onChange={handleDepartmentChange}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
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
    </DialogParent>
  );
};

export default EditUser;
