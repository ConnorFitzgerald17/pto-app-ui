import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ViewDepartment = ({ isOpen, onClose, department }) => {
  if (!department) return null;

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

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Department Details
                    </Dialog.Title>

                    <div className="mt-4 space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Name
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {department.name}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Manager
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {department.manager || "No manager assigned"}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Members
                        </h4>
                        <div className="mt-1 text-sm text-gray-900">
                          <p>Direct Members: {department.directCount || 0}</p>
                          {department.children?.length > 0 && (
                            <p>Total Members: {department.totalCount || 0}</p>
                          )}
                        </div>
                      </div>

                      {department.policies?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Policies
                          </h4>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {department.policies.map((policy) => (
                              <span
                                key={policy}
                                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                              >
                                {policy}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Status
                        </h4>
                        <span className="mt-2 inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          {department.status}
                        </span>
                      </div>
                    </div>
                  </div>
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
