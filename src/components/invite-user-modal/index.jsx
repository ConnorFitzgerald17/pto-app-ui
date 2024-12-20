import { Dialog } from "@headlessui/react";
import { EnvelopeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  roleId: Yup.string().required("Role is required"),
});

const initialValues = {
  email: "",
  roleId: "",
};

const InviteUserModal = ({ isOpen, onClose }) => {
  const roles = useSelector((state) => state.roles.dropdownRoles);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Inviting user:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      onClose();
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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="colleague@company.com"
                    />
                    {errors.email && touched.email && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="roleId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Access Level
                    </label>
                    <Field
                      as="select"
                      name="roleId"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select access level</option>
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </Field>
                    {errors.roleId && touched.roleId && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.roleId}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Invitation"}
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

export default InviteUserModal;
