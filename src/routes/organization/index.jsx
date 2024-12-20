import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import orgThunks from "src/state/org/thunks";
import rolesThunks from "src/state/role/thunks";
import policyThunks from "src/state/policy/thunks";

import PolicyOverview from "src/components/policy-overview";
import InviteUserModal from "src/components/invite-user-modal";
import {
  PERMISSIONS,
  PERMISSION_DESCRIPTIONS,
} from "src/constants/permissions";

export default function OrganizationDashboard() {
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const roles = useSelector((state) => state.roles.roles);
  const dropdownRoles = useSelector((state) => state.roles.dropdownRoles);
  const policy = useSelector((state) => state.policy.policy);
  const orgLoading = useSelector((state) => state.org.isLoading);
  const dispatch = useDispatch();
  const currentUserPermissions = useSelector(
    (state) => state.user.details?.role?.permissions || [],
  );

  console.log(dropdownRoles);

  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
    dispatch(rolesThunks.getRoles({}));
    dispatch(policyThunks.getPolicy({}));
  }, [dispatch]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  if (orgLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Organization Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team members and their roles
          </p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Invite User
        </button>
      </div>

      {/* Updated Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard title="Total Users" value={orgUsers ? orgUsers.length : 0} />
        <StatsCard
          title="Active Users"
          value={orgUsers ? orgUsers.filter((u) => u.isVerified).length : 0}
        />
        <StatsCard
          title="Pending Invites"
          value={orgUsers ? orgUsers.filter((u) => !u.isVerified).length : 0}
        />
      </div>

      {/* Updated Users Table */}
      {orgUsers && orgUsers.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orgUsers.map((user) => (
                <tr key={user.userId}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          {user.firstName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {`${user.firstName} ${user.lastName}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {user.role.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.isVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.isVerified ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                    <button className="ml-4 text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <p className="text-gray-500">No users found in your organization.</p>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Invite Your First User
          </button>
        </div>
      )}

      {currentUserPermissions.includes(PERMISSIONS.MANAGE_ROLES) && (
        <>
          <hr className="my-8" />

          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Role Management
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage roles and their permissions
                </p>
              </div>
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Create Role
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roles &&
                roles.map((role) => <RoleCard key={role.id} role={role} />)}
            </div>
          </div>
        </>
      )}

      {currentUserPermissions.includes(PERMISSIONS.MANAGE_POLICIES) && (
        <>
          <hr className="my-8" />

          {policy &&
            policy.map((p) => <PolicyOverview key={p.id} policy={p} />)}
        </>
      )}
    </div>
  );
}

const StatsCard = ({ title, value }) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <div className="text-sm font-medium text-gray-500">{title}</div>
    <div className="mt-2 text-3xl font-semibold text-gray-900">{value}</div>
  </div>
);

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
