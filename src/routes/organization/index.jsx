import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import orgThunks from "src/state/org/thunks";
import rolesThunks from "src/state/role/thunks";
import policyThunks from "src/state/policy/thunks";
import PolicyOverview from "src/components/policy-overview";
import InviteUserModal from "src/components/invite-user-modal";
import LoadingSpinner from "src/components/loading-spinner";
import {
  PERMISSIONS,
  PERMISSION_DESCRIPTIONS,
} from "src/constants/permissions";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const tabs = [
  { name: "Active Users", href: "#active", icon: UsersIcon, current: true },
  { name: "Pending Invites", href: "#pending", icon: UserIcon, current: false },
  { name: "Roles", href: "#roles", icon: BuildingOfficeIcon, current: false },
  { name: "Policies", href: "#policies", icon: CreditCardIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrganizationDashboard() {
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const roles = useSelector((state) => state.roles.roles);
  const policy = useSelector((state) => state.policy.policy);
  const orgLoading = useSelector((state) => state.org.isLoading);
  const dispatch = useDispatch();
  const currentUserPermissions = useSelector(
    (state) => state.user.details?.role?.permissions || [],
  );

  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
    dispatch(rolesThunks.getRoles({}));
    dispatch(policyThunks.getPolicy({}));
  }, [dispatch]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Active Users");

  if (orgLoading) {
    return <LoadingSpinner />;
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
        <StatsCard
          title="Total Users"
          value={orgUsers ? orgUsers.users?.length : 0}
        />
        <StatsCard
          title="Active Users"
          value={
            orgUsers ? orgUsers.users?.filter((u) => u.isVerified).length : 0
          }
        />
        <StatsCard
          title="Pending Invites"
          value={
            orgUsers ? orgUsers.invites?.filter((u) => !u.isVerified).length : 0
          }
        />
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500" />
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={classNames(
                    activeTab === tab.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium",
                  )}
                >
                  <tab.icon
                    className={classNames(
                      activeTab === tab.name
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 size-5",
                    )}
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-8">
        {activeTab === "Active Users" &&
          orgUsers &&
          orgUsers.users?.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Active Users
              </h2>
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
                    {orgUsers.users?.map((user) => (
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
            </div>
          )}

        {activeTab === "Pending Invites" &&
          orgUsers &&
          orgUsers.invites?.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Pending Invites
              </h2>
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
                    {orgUsers.invites?.map((user) => (
                      <tr key={user.email}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Invited User
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-yellow-100 text-yellow-800`}
                          >
                            Invited
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Resend
                          </button>
                          <button className="ml-4 text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {activeTab === "Roles" &&
          currentUserPermissions.includes(PERMISSIONS.MANAGE_ROLES) && (
            <div>
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
          )}

        {activeTab === "Policies" &&
          currentUserPermissions.includes(PERMISSIONS.MANAGE_POLICIES) && (
            <div>
              {policy &&
                policy.map((p) => <PolicyOverview key={p.id} policy={p} />)}
            </div>
          )}

        {/* No Content State */}
        {((activeTab === "Active Users" && !orgUsers?.users?.length) ||
          (activeTab === "Pending Invites" && !orgUsers?.invites?.length)) && (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-500">
              No {activeTab.toLowerCase()} found in your organization.
            </p>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Invite User
            </button>
          </div>
        )}
      </div>
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