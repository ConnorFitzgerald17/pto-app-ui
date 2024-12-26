import userThunks from "src/state/user/thunks";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import ErrorBanner from "src/components/error-banner";
import InputField from "src/components/input";
import SelectField from "src/components/select";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});

const InviteUserModal = ({ isOpen, onClose, fetchUsers }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.dropdownRoles);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [error, setError] = useState(false);
  const policies = useSelector((state) => state.policy.policy);

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
      policyIds: [],
    },
    validationSchema,
    onSubmit: async (values) => {
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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <EnvelopeIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Invite New Team Member
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Send an invitation to join your team. The invited user will
                    receive an email with instructions to set up their account
                    and access the platform with the specified role permissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {error && <ErrorBanner message={error} />}

              <form onSubmit={formik.handleSubmit} className="space-y-4">
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

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Access Level
                  </label>
                  <SelectField
                    id="role"
                    name="role"
                    options={roles}
                    placeholder="Select access level"
                    value={formik.values.role}
                    onChange={(value) => formik.setFieldValue("role", value)}
                  />
                  {formik.touched.role && formik.errors.role && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.role}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Assign PTO Policies
                  </label>
                  <div className="mt-2 max-h-48 overflow-y-auto space-y-2">
                    {policies.map((policy) => (
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
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    {isLoading ? "Sending..." : "Send Invitation"}
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
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default InviteUserModal;
