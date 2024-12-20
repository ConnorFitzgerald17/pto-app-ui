import React from "react";
import RoleCard from "src/components/role-card";

const RoleManagement = ({ roles, onCreateRoleClick, handleFetch }) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Role Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage roles and their permissions
          </p>
        </div>
        <button
          onClick={onCreateRoleClick}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Role
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roles &&
          roles.map((role) => (
            <RoleCard key={role.roleId} role={role} handleFetch={handleFetch} />
          ))}
      </div>
    </div>
  );
};

export default RoleManagement;
