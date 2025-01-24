import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Popover } from "@headlessui/react";
import { CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const PolicyTypeGrid = ({ value = [], onChange, disabled = false }) => {
  const policies = useSelector((state) => state.policy.policy);

  const groupedPolicies = useMemo(() => {
    if (!policies) return {};
    return policies.reduce((acc, policy) => {
      if (!acc[policy.type]) {
        acc[policy.type] = [];
      }
      acc[policy.type].push(policy);
      return acc;
    }, {});
  }, [policies]);

  const selectedPoliciesByType = useMemo(() => {
    return value.reduce((acc, policyId) => {
      const policy = policies?.find((p) => p.policyId === policyId);
      if (policy) acc[policy.type] = policyId;
      return acc;
    }, {});
  }, [value, policies]);

  if (!policies) {
    return <div>Loading policies...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Default Policies
        </label>
      </div>

      {/* Info banners */}
      <div className="space-y-3">
        <div className="rounded-md bg-blue-50 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-blue-700">
                Only one policy of each type can be assigned to a department.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {Object.entries(groupedPolicies).map(([type, typePolicies]) => (
          <Popover key={type} className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  disabled={disabled}
                  className={`
                    w-full rounded-md border p-3 text-left transition-all
                    ${
                      disabled
                        ? "bg-gray-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }
                    ${
                      open
                        ? "ring-2 ring-indigo-600 border-transparent"
                        : "border-gray-200"
                    }
                    ${
                      selectedPoliciesByType[type]
                        ? "bg-indigo-50 border-indigo-200"
                        : ""
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {type}
                      </h3>
                      {selectedPoliciesByType[type] ? (
                        <p className="mt-1 text-sm text-gray-600">
                          {
                            policies.find(
                              (p) =>
                                p.policyId === selectedPoliciesByType[type],
                            )?.name
                          }
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">
                          Select a policy
                        </p>
                      )}
                    </div>
                    <CheckIcon
                      className={`h-5 w-5 ${
                        selectedPoliciesByType[type]
                          ? "text-indigo-600"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                </Popover.Button>

                <Popover.Panel className="absolute z-[100] w-full mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="max-h-[200px] overflow-y-auto py-1">
                    {typePolicies.map((policy) => (
                      <button
                        type="button"
                        key={policy.policyId}
                        onClick={() => {
                          const newValue = value.filter(
                            (id) =>
                              policies.find((p) => p.policyId === id)?.type !==
                              type,
                          );
                          if (
                            policy.policyId !== selectedPoliciesByType[type]
                          ) {
                            newValue.push(policy.policyId);
                          }
                          onChange(newValue);
                        }}
                        className={`
                          w-full px-4 py-2 text-left hover:bg-gray-50
                          ${
                            selectedPoliciesByType[type] === policy.policyId
                              ? "bg-indigo-50"
                              : ""
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {policy.name}
                            </p>
                            {policy.description && (
                              <p className="text-sm text-gray-500">
                                {policy.description}
                              </p>
                            )}
                          </div>
                          {selectedPoliciesByType[type] === policy.policyId && (
                            <CheckIcon className="h-5 w-5 text-indigo-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default PolicyTypeGrid;
