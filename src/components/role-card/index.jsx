import { useState } from "react";
import { PERMISSION_DESCRIPTIONS } from "../../constants/permissions";

const RoleCard = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{role.name}</h3>
          <button className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
            Edit Role
          </button>
        </div>
        <div>
          <p className="text-xs text-gray-500">{role.description}</p>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-gray-600">Permissions</h4>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? "− Less" : "+ More"}
            </button>
          </div>

          {isExpanded ? (
            <div className="mt-2 space-y-1.5">
              {role.permissions.map((permission) => (
                <div key={permission} className="rounded bg-gray-50 px-3 py-2">
                  <div className="text-xs font-medium text-gray-700">
                    {permission}
                  </div>
                  {PERMISSION_DESCRIPTIONS[permission] && (
                    <div className="mt-0.5 text-xs text-gray-500">
                      {PERMISSION_DESCRIPTIONS[permission]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {role.permissions.map((permission) => (
                <span
                  key={permission}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                >
                  {permission}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
