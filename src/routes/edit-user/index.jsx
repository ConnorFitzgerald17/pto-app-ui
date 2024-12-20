import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup"; // Recommended for validation
import rolesThunks from "src/state/role/thunks";
import LoadingSpinner from "src/components/loading-spinner";
import ConfirmDialog from "src/components/confirm";
import ErrorBanner from "src/components/error-banner";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";
import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import {
  PERMISSIONS,
  PERMISSION_DESCRIPTIONS,
} from "src/constants/permissions";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Role name is required"),
  description: Yup.string().required("Description is required"),
  permissions: Yup.array().min(1, "Select at least one permission"),
  isDefault: Yup.boolean(),
});

const EditRole = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [error, setError] = useState(false);
  const { roleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(roleId);

  const role = useSelector((state) => state.roles.role);
  const roleLoading = useSelector((state) => state.roles.isLoading);

  useEffect(() => {
    dispatch(rolesThunks.getRole({ roleId }));
  }, [dispatch, roleId]);

  const formik = useFormik({
    initialValues: {
      name: role?.name || "",
      description: role?.description || "",
      permissions: role?.permissions || [],
      isDefault: role?.isDefault || false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(
          rolesThunks.updateRole(
            { data: values, roleId },
            (err) => {
              if (!err) {
                createSuccessToast(toastMessages.UPDATE_ROLE_SUCCESSFUL);
                navigate("/organization", { state: { activeTab: "Roles" } });
                return;
              }
              setError(decodeAPIMessage(get(err, "response.data.error", "")));
            },
            false,
          ),
        );
      } catch (error) {
        createErrorToast(toastMessages.UPDATE_ROLE_ERROR);
      }
    },
    enableReinitialize: true, // Important for when role data loads
  });

  const handleConfirm = () => {
    formik.setFieldValue("isDefault", true);
    setIsConfirmDialogOpen(false);
  };

  if (!roleId) {
    navigate("/organization");
  }

  if (!role || roleLoading) {
    return <LoadingSpinner />;
  }

  const availablePermissions = Object.entries(PERMISSIONS).map(
    ([key, value]) => ({
      value: value,
      label: PERMISSION_DESCRIPTIONS[key],
    }),
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Edit Role</h1>
            <p className="mt-2 text-sm text-gray-600">
              Update the role settings and permissions. Changes will affect all
              users assigned to this role.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {error && <ErrorBanner message={error} />}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Describe the purpose and responsibilities of this role"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-3 bg-gray-50 rounded-md p-4">
                  {availablePermissions.map((permission) => (
                    <label key={permission.value} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          name="permissions"
                          value={permission.value}
                          checked={formik.values.permissions.includes(
                            permission.value,
                          )}
                          onChange={formik.handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          {permission.label}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {permission.value}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                {formik.touched.permissions && formik.errors.permissions && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.permissions}
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formik.values.isDefault}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIsConfirmDialogOpen(true);
                      } else {
                        formik.setFieldValue("isDefault", false);
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Set as default role for new users
                  </span>
                </label>
                {role?.isDefault && (
                  <span className="ml-2 text-sm text-gray-600">
                    Current default role
                  </span>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/organization", {
                      state: { activeTab: "Roles" },
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={roleLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {roleLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRole;
