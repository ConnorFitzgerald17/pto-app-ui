import { useState } from "react";
import { PERMISSION_DESCRIPTIONS } from "../../constants/permissions";

const RoleCard = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-900">
          Edit Role
        </button>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-500">Permissions:</h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-indigo-600 hover:text-indigo-900"
          >
            {isExpanded ? "Show less" : "Show details"}
          </button>
        </div>
        {isExpanded ? (
          <div className="mt-3 space-y-2">
            {role.permissions.map((permission) => (
              <div key={permission} className="rounded-lg bg-gray-50 p-3">
                <div className="font-medium text-sm text-gray-900">
                  {permission}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {PERMISSION_DESCRIPTIONS[permission] ||
                    "Permission description not available"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {role.permissions.map((permission) => (
              <span
                key={permission}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
              >
                {permission}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleCard;
