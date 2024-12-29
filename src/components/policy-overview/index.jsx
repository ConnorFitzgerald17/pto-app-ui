import { format } from "date-fns";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Button from "src/components/button";
const PolicyOverview = ({ policy }) => {
  if (!policy) {
    return null;
  }

  const {
    name = "Untitled Policy",
    description = "No description provided",
    status = "INACTIVE",
    accrualRules = {},
    carryOver = {},
    restrictions = {},
  } = policy;

  const { frequency = "Not set", amount = 0, maxBalance = 0 } = accrualRules;

  const { allowed = false, maxDays = 0, expiryDate = null } = carryOver;

  const {
    minDaysNotice = 0,
    maxConsecutiveDays = 0,
    blackoutDates = [],
  } = restrictions;

  const formatDate = (date) => {
    try {
      return date ? format(new Date(date), "MMM dd, yyyy") : "Not set";
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {policy && (
        <Disclosure defaultOpen>
          {({ open }) => (
            <div
              className={`bg-white rounded-lg ${
                !open && "hover:bg-gray-100"
              } transition-colors duration-150`}
            >
              <Disclosure.Button className="w-full flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-500`}
                />
              </Disclosure.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-98 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-98 opacity-0"
              >
                <Disclosure.Panel className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-6">{description}</p>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Accrual Rules Card */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-800 mb-4">
                          Accrual Rules
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Frequency
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {frequency}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Amount
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {amount.toFixed(2)} days
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Max Balance
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {maxBalance} days
                            </dd>
                          </div>
                        </div>
                      </div>

                      {/* Carry Over Card */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-800 mb-4">
                          Carry Over
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Allowed
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {allowed ? "Yes" : "No"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Max Days
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {maxDays}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Expires
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {formatDate(expiryDate)}
                            </dd>
                          </div>
                        </div>
                      </div>

                      {/* Restrictions Card */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-800 mb-4">
                          Restrictions
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Min Notice
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {minDaysNotice} days
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Max Consecutive
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {maxConsecutiveDays} days
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">
                              Blackout Periods
                            </dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              {blackoutDates.length}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button variant="tertiary">Edit Policy Details</Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      )}
    </div>
  );
};

export default PolicyOverview;
