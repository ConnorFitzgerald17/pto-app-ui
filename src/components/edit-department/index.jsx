import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import departmentThunks from "src/state/department/thunks";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  managerId: Yup.string().nullable(),
  status: Yup.string().oneOf(["ACTIVE", "INACTIVE"]).required(),
  parentDepartmentId: Yup.string().nullable(),
  policies: Yup.array().of(Yup.string()),
});

const EditDepartment = ({
  isOpen,
  onClose,
  department,
  managers = [],
  policies = [],
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: department?.name || "",
      managerId: department?.managerId || "",
      status: department?.status || "ACTIVE",
      parentDepartmentId: department?.parentDepartmentId || "",
      policies: department?.policies || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          departmentThunks.updateDepartment({
            departmentId: department.departmentId,
            data: values,
          }),
        );
        onClose();
      } catch (error) {
        console.error("Failed to update department:", error);
      }
    },
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Edit Department
                      </h3>
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="managerId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Manager
                      </label>
                      <select
                        id="managerId"
                        name="managerId"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formik.values.managerId}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select a manager</option>
                        {managers.map((manager) => (
                          <option key={manager.userId} value={manager.userId}>
                            {`${manager.firstName} ${manager.lastName}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Policies
                      </label>
                      <div className="mt-2 max-h-48 overflow-y-auto space-y-2">
                        {policies.map((policy) => (
                          <div
                            key={policy.policyId}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={`policy-${policy.policyId}`}
                              name="policies"
                              value={policy.policyId}
                              checked={formik.values.policies.includes(
                                policy.policyId,
                              )}
                              onChange={(e) => {
                                const newPolicies = e.target.checked
                                  ? [...formik.values.policies, policy.policyId]
                                  : formik.values.policies.filter(
                                      (id) => id !== policy.policyId,
                                    );
                                formik.setFieldValue("policies", newPolicies);
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
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditDepartment;
