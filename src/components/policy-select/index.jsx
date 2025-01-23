import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import policyThunks from "src/state/policy/thunks";
import SelectMenu from "src/components/select";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const PolicySelect = ({ value = [], onChange, disabled = false }) => {
  const dispatch = useDispatch();
  const policies = useSelector((state) => state.policy.policy);

  useEffect(() => {
    if (!policies) {
      dispatch(policyThunks.getPolicy());
    }
  }, []);

  // Group policies by type
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

  const handlePolicyChange = (type, policyId) => {
    if (!policyId) {
      // Remove policy of this type
      const newValue = value.filter(
        (id) => policies.find((p) => p.policyId === id)?.type !== type,
      );
      onChange(newValue);
      return;
    }

    // Replace or add policy of this type
    const newValue = [
      ...value.filter(
        (id) => policies.find((p) => p.policyId === id)?.type !== type,
      ),
      policyId,
    ];
    onChange(newValue);
  };

  if (!policies) {
    return <div>Loading policies...</div>;
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Default Policies
      </label>

      {/* Info banner */}
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

      {/* Policy type groups */}
      <div className="space-y-3">
        {Object.entries(groupedPolicies).map(([type, typePolicies]) => {
          const selectedPolicyId = value.find(
            (id) => policies.find((p) => p.policyId === id)?.type === type,
          );

          return (
            <div key={type} className="relative">
              <label className="block text-sm font-medium text-gray-700">
                {type}
              </label>
              <div className="mt-1">
                <SelectMenu
                  options={[
                    ...typePolicies.map((policy) => ({
                      value: policy.policyId,
                      label: policy.name,
                    })),
                  ]}
                  value={selectedPolicyId || ""}
                  onChange={(newValue) => handlePolicyChange(type, newValue)}
                  disabled={disabled}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicySelect;
