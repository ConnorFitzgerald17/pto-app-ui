import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const ViewDepartment = ({ isOpen, onClose, department }) => {
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const policies = useSelector((state) => state.policy.policy);

  if (!department) return null;

  const formatUserName = (userId) => {
    const user = orgUsers?.users?.find((u) => u.userId === userId);
    return user ? `${user.firstName} ${user.lastName}` : "N/A";
  };

  const getPolicyName = (policyId) => {
    const policy = policies?.find((p) => p.policyId === policyId);
    return policy ? policy.name : "N/A";
  };

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
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                      Department Details
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        View department information and configuration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Name</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {department.name}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Department Heads
                    </h4>
                    {department.departmentHeads?.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {department.departmentHeads.map((headId) => (
                          <span
                            key={headId}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {formatUserName(headId)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">
                        No department heads assigned
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Members
                    </h4>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          Direct Members: {department.directCount || 0}
                        </span>
                      </div>
                      {department.children?.length > 0 && (
                        <div className="flex items-center gap-2">
                          <UserGroupIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            Total Members: {department.totalCount || 0}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Status
                    </h4>
                    <span className="mt-2 inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {department.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Policies
                    </h4>
                    {department.defaultPolicyIds?.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {department.defaultPolicyIds.map((policyId) => (
                          <span
                            key={policyId}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {getPolicyName(policyId)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">
                        No policies assigned
                      </p>
                    )}
                  </div>

                  {department.children?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Sub-departments
                      </h4>
                      <div className="mt-2 space-y-2">
                        {department.children.map((child) => (
                          <div
                            key={child.departmentId}
                            className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                          >
                            <p className="text-sm font-medium text-gray-900">
                              {child.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Members: {child.directCount || 0}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-xs text-gray-500">
                    <p>
                      Created: {format(new Date(department.createdAt), "PPpp")}
                    </p>
                    <p>
                      Last Updated:{" "}
                      {format(new Date(department.updatedAt), "PPpp")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewDepartment;
