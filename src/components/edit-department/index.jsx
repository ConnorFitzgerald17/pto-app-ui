import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import {
  BuildingOfficeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

import departmentThunks from "src/state/department/thunks";
import { createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import ErrorBanner from "src/components/error-banner";
import InputField from "src/components/input";
import UserTagSelect from "src/components/user-tag-select";
import PolicyTypeGrid from "src/components/policy-type-grid";
import SelectMenu from "src/components/select";
import LoadingSpinner from "src/components/loading-spinner";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  departmentHeads: Yup.array().of(Yup.string()),
  status: Yup.string().oneOf(["ACTIVE", "INACTIVE"]).required(),
  defaultPolicyIds: Yup.array().of(Yup.string()),
});

const EditDepartment = ({ isOpen, onClose, department }) => {
  const dispatch = useDispatch();
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const orgLoading = useSelector((state) => state.org.isLoading);
  const departmentLoading = useSelector((state) => state.department.isLoading);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    formik.resetForm();
    formik.setErrors({});
    formik.setTouched({});
    setError(null);
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      name: department?.name || "",
      departmentHeads: department?.departmentHeads || [],
      status: department?.status || "ACTIVE",
      defaultPolicyIds: department?.defaultPolicyIds || [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        await dispatch(
          departmentThunks.updateDepartment({
            departmentId: department.departmentId,
            data: values,
          }),
        );
        createSuccessToast(toastMessages.UPDATE_DEPARTMENT_SUCCESSFUL);
        onClose();
      } catch (err) {
        setError(decodeAPIMessage(get(err, "response.data.error", "")));
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (orgLoading || departmentLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <BuildingOfficeIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Edit Department
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Update department settings and configuration.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {error && <ErrorBanner message={error} />}
              <form
                id="edit-department-form"
                onSubmit={formik.handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department Name
                  </label>
                  <InputField
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="departmentHeads"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department Heads
                  </label>
                  <div className="mt-1">
                    <UserTagSelect
                      users={orgUsers.users || []}
                      selectedUsers={formik.values.departmentHeads}
                      onChange={(value) =>
                        formik.setFieldValue("departmentHeads", value)
                      }
                      disabled={isLoading}
                      placeholder="Search for users to add as department heads..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <SelectMenu
                    options={[
                      { label: "Active", value: "ACTIVE" },
                      { label: "Inactive", value: "INACTIVE" },
                    ]}
                    value={formik.values.status}
                    onChange={(value) => formik.setFieldValue("status", value)}
                    disabled={isLoading}
                    placeholder="Select status..."
                  />
                </div>

                {!department?.parentDepartmentId ? (
                  <div>
                    <PolicyTypeGrid
                      value={formik.values.defaultPolicyIds}
                      onChange={(value) =>
                        formik.setFieldValue("defaultPolicyIds", value)
                      }
                    />
                  </div>
                ) : (
                  <div className="rounded-md bg-yellow-50 p-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <InformationCircleIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-yellow-700">
                          This is a sub-department and inherits policies from
                          its parent department.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                form="edit-department-form"
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
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

export default EditDepartment;
