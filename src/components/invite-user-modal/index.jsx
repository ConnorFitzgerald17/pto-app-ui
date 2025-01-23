import userThunks from "src/state/user/thunks";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Tab } from "@headlessui/react";
import { classNames } from "src/utils/class-names";

import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import ErrorBanner from "src/components/error-banner";
import InputField from "src/components/input";
import UserRoleSelect from "src/components/user-role-select";
import DepartmentSelect from "src/components/department-select";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});

const InviteUserModal = ({ isOpen, onClose, fetchUsers }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab(0);
      setError(false);
      setCsvFile(null);
      setCsvPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      formik.resetForm();
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
      department: "",
      team: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        dispatch(
          userThunks.invite(
            { data: values },
            (err) => {
              if (!err) {
                createSuccessToast(toastMessages.INVITE_SUCCESSFUL);
                formik.resetForm();
                onClose();
                fetchUsers();
                return;
              }
              setError(decodeAPIMessage(get(err, "response.data.error", "")));
            },
            false,
          ),
        );
      } catch (error) {
        console.error("Error inviting user:", error);
      }
    },
  });

  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const rows = text.split("\n").map((row) => row.split(","));
        const headers = rows[0].map((header) => header.trim().toLowerCase());

        // Validate headers
        const requiredHeaders = ["email", "role", "department", "team"];
        const missingHeaders = requiredHeaders.filter(
          (h) => !headers.includes(h),
        );

        if (missingHeaders.length > 0) {
          createErrorToast(
            `Missing required columns: ${missingHeaders.join(", ")}`,
          );
          resetFileUpload();
          return;
        }

        // Parse and validate data
        const users = rows
          .slice(1)
          .filter(
            (row) =>
              row.length === headers.length && row.some((cell) => cell.trim()),
          )
          .map((row) => {
            const user = {};
            headers.forEach((header, i) => {
              user[header] = row[i].trim();
            });
            return user;
          });

        if (users.length === 0) {
          createErrorToast("No valid users found in CSV");
          resetFileUpload();
          return;
        }

        setCsvFile(users);
        // Show preview of first 5 users
        setCsvPreview(users.slice(0, 5));
      } catch (error) {
        createErrorToast("Error processing CSV file");
        resetFileUpload();
      }
    };
    reader.readAsText(file);
  };

  const resetFileUpload = () => {
    setCsvFile(null);
    setCsvPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBulkSubmit = () => {
    if (!csvFile) return;

    dispatch(
      userThunks.inviteUsers(
        { data: { users: csvFile } },
        (err) => {
          if (!err) {
            createSuccessToast(toastMessages.BULK_INVITE_SUCCESSFUL);
            onClose();
            fetchUsers();
            return;
          }
          setError(decodeAPIMessage(get(err, "response.data.error", "")));
          resetFileUpload();
        },
        false,
      ),
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white ring-opacity-60 ring-offset-2 focus:outline-none",
                      selected
                        ? "bg-white text-indigo-600 shadow"
                        : "text-gray-600 hover:bg-white/[0.12] hover:text-indigo-600",
                    )
                  }
                >
                  <div className="flex items-center justify-center space-x-2">
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Single User</span>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white ring-opacity-60 ring-offset-2 focus:outline-none",
                      selected
                        ? "bg-white text-indigo-600 shadow"
                        : "text-gray-600 hover:bg-white/[0.12] hover:text-indigo-600",
                    )
                  }
                >
                  <div className="flex items-center justify-center space-x-2">
                    <UsersIcon className="h-5 w-5" />
                    <span>Bulk Upload</span>
                  </div>
                </Tab>
              </Tab.List>

              <Tab.Panels className="mt-6">
                <Tab.Panel>
                  {/* Single User Form */}
                  {error && <ErrorBanner message={error} />}
                  <form
                    id="single-user-form"
                    onSubmit={formik.handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <InputField
                        type="email"
                        id="email"
                        name="email"
                        placeholder="colleague@company.com"
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

                    <UserRoleSelect
                      value={formik.values.role}
                      onChange={(value) => formik.setFieldValue("role", value)}
                    />
                    <DepartmentSelect
                      value={formik.values.department}
                      onChange={(value) =>
                        formik.setFieldValue("department", value)
                      }
                    />
                  </form>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="space-y-4">
                    {!csvFile ? (
                      <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                        <div className="text-center">
                          <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer"
                            >
                              <span className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                Upload CSV
                              </span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept=".csv"
                                className="sr-only"
                                onChange={handleCSVUpload}
                                ref={fileInputRef}
                              />
                            </label>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            CSV must include: email, role, department, team
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Preview ({csvFile.length} users)
                          </h3>
                          <button
                            type="button"
                            onClick={resetFileUpload}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove file
                          </button>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Email
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Role
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Department
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Team
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {csvPreview.map((user, idx) => (
                                <tr key={idx}>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {user.email}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {user.role}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {user.department}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {user.team}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {csvFile.length > 5 && (
                            <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500">
                              And {csvFile.length - 5} more users...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        CSV Format Example:
                      </h4>
                      <pre className="mt-2 text-xs text-gray-500">
                        email,role,department,team{"\n"}
                        john@example.com,EMPLOYEE,Engineering,Frontend{"\n"}
                        jane@example.com,EMPLOYEE,Marketing,Growth
                      </pre>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              {activeTab === 0 ? (
                <button
                  form="single-user-form"
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                >
                  {isLoading ? "Sending..." : "Send Invitation"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!csvFile || isLoading}
                  onClick={handleBulkSubmit}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Upload and Send Invitations"}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default InviteUserModal;
