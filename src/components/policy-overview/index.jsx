import { format } from "date-fns";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

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
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="max-w-2xl mx-auto">
          <Disclosure.Button className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
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
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="mt-2 bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-6">{description}</p>

              <div className="grid grid-cols-1 gap-4">
                {/* Accrual Rules Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800 mb-3">
                    Accrual Rules
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Frequency
                      </dt>
                      <dd className="text-sm text-gray-900">{frequency}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {amount.toFixed(2)} days
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Max Balance
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {maxBalance} days
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Carry Over Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800 mb-3">
                    Carry Over
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Allowed
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {allowed ? "Yes" : "No"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Max Days
                      </dt>
                      <dd className="text-sm text-gray-900">{maxDays}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Expires
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {formatDate(expiryDate)}
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Restrictions Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800 mb-3">
                    Restrictions
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Min Notice
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {minDaysNotice} days
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Max Consecutive
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {maxConsecutiveDays} days
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">
                        Blackout Periods
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {blackoutDates.length}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent 
                             text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Policy Details
                </button>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default PolicyOverview;
