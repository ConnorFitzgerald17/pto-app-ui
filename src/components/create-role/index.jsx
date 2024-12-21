import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";

import ErrorBanner from "src/components/error-banner";
import { createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";
import roleThunks from "src/state/role/thunks";
import {
  PERMISSIONS_LIST,
  PERMISSION_DESCRIPTIONS,
} from "src/constants/permissions";
import { DEFAULT_ROLES } from "src/constants/default-roles";
import DialogParent from "src/components/dialog";
import SelectMenu from "src/components/select";
import InputField from "src/components/input";
import TextareaField from "src/components/textarea";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  permissions: Yup.array()
    .min(1, "At least one permission is required")
    .required("Permissions are required"),
});

const initialValues = {
  name: "",
  description: "",
  permissions: [],
};

const CreateRoleModal = ({ isOpen, onClose, fetchRoles }) => {
  const [error, setError] = useState(false);
  const [template, setTemplate] = useState("");
  const isLoading = useSelector((state) => state.roles.isLoading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(
          roleThunks.createRole(
            { data: values },
            (err) => {
              if (!err) {
                createSuccessToast(toastMessages.CREATE_ROLE_SUCCESSFUL);
                resetForm();
                onClose();
                fetchRoles();
                return;
              }
              setError(decodeAPIMessage(get(err, "response.data.error", "")));
            },
            false,
          ),
        );
      } catch (error) {
        console.error("Error creating role:", error);
      }
    },
  });

  const handleTemplateChange = (value) => {
    if (!value) {
      formik.resetForm();
      setTemplate("");
      return;
    }

    const selectedRole = DEFAULT_ROLES.find((role) => role.name === value);
    if (selectedRole) {
      formik.setValues({
        name: selectedRole.name,
        description: selectedRole.description,
        permissions: selectedRole.permissions,
      });
      setTemplate(value);
    }
  };

  return (
    <DialogParent
      icon={<KeyIcon className="h-6 w-6" />}
      iconColor="bg-blue-100"
      title="Create New Role"
      description="Create a new role by specifying its name, description, and selecting the permissions that will be granted to users with this role."
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className="space-y-4">
        {error && <ErrorBanner message={error} />}
        <form onSubmit={formik.handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="template"
              className="block text-sm font-medium text-gray-700"
            >
              Use Template (Optional)
            </label>
            <SelectMenu
              options={DEFAULT_ROLES.map((role) => ({
                value: role.name,
                label: role.name,
              }))}
              value={template}
              onChange={(value) => handleTemplateChange(value)}
              optional={true}
              optionalText="None"
            />
          </div>

          <div>
            <InputField
              id="name"
              label="Role Name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., Admin, Editor, Viewer"
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
            <TextareaField
              id="description"
              name="description"
              rows={3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder="Describe the purpose of this role"
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
            <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-4">
              {PERMISSIONS_LIST.map((permission) => {
                const permissionId =
                  typeof permission === "string" ? permission : permission.id;
                return (
                  <div
                    key={permissionId}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id={`permission-${permissionId}`}
                        checked={formik.values.permissions.includes(
                          permissionId,
                        )}
                        onChange={() => {
                          const newPermissions =
                            formik.values.permissions.includes(permissionId)
                              ? formik.values.permissions.filter(
                                  (p) => p !== permissionId,
                                )
                              : [...formik.values.permissions, permissionId];
                          formik.setFieldValue("permissions", newPermissions);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <label
                      className="flex-1 cursor-pointer select-none"
                      htmlFor={`permission-${permissionId}`}
                    >
                      <p className="font-medium text-sm text-gray-700">
                        {typeof permission === "string"
                          ? permission
                          : permission.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {PERMISSION_DESCRIPTIONS[permissionId]}
                      </p>
                    </label>
                  </div>
                );
              })}
            </div>
            {formik.touched.permissions && formik.errors.permissions && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.permissions}
              </div>
            )}
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            >
              {isLoading ? "Creating..." : "Create Role"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DialogParent>
  );
};

export default CreateRoleModal;
