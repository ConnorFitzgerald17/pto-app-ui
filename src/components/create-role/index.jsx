import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field } from "formik";
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
  const dispatch = useDispatch();

  const handleTemplateChange = (e, setValues) => {
    if (!e.target.value) {
      setValues(initialValues);
      return;
    }

    const selectedRole = DEFAULT_ROLES.find(
      (role) => role.name === e.target.value,
    );
    if (selectedRole) {
      setValues({
        name: selectedRole.name,
        description: selectedRole.description,
        permissions: selectedRole.permissions,
      });
    }
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
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
            setSubmitting(false);
          },
          false,
        ),
      );
    } catch (error) {
      console.error("Error inviting user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <KeyIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Create New Role
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Create a new role by specifying its name, description, and
                    selecting the permissions that will be granted to users with
                    this role.
                  </p>
                </div>
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                errors,
                touched,
                values,
                setFieldValue,
                setValues,
              }) => (
                <Form className="mt-5 space-y-4">
                  {error && <ErrorBanner message={error} />}

                  <div>
                    <label
                      htmlFor="template"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Use Template (Optional)
                    </label>
                    <select
                      id="template"
                      onChange={(e) => handleTemplateChange(e, setValues)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a template</option>
                      {DEFAULT_ROLES.map((role) => (
                        <option key={role.name} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="e.g., Admin, Editor, Viewer"
                    />
                    {errors.name && touched.name && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.name}
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
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Describe the purpose of this role"
                    />
                    {errors.description && touched.description && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.description}
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
                          typeof permission === "string"
                            ? permission
                            : permission.id;

                        return (
                          <div
                            key={permissionId}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                id={`permission-${permissionId}`}
                                checked={values.permissions.includes(
                                  permissionId,
                                )}
                                onChange={(e) => {
                                  const newPermissions = e.target.checked
                                    ? [...values.permissions, permissionId]
                                    : values.permissions.filter(
                                        (p) => p !== permissionId,
                                      );

                                  setFieldValue("permissions", newPermissions);
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
                    {errors.permissions && touched.permissions && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.permissions}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {isSubmitting ? "Creating..." : "Create Role"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateRoleModal;
