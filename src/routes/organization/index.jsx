import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";

import orgThunks from "src/state/org/thunks";
import rolesThunks from "src/state/role/thunks";
import policyThunks from "src/state/policy/thunks";
import userThunks from "src/state/user/thunks";

import PolicyOverview from "src/components/policy-overview";
import InviteUserModal from "src/components/invite-user-modal";
import LoadingSpinner from "src/components/loading-spinner";
import Confirm from "src/components/confirm";
import StatsCard from "src/components/stats-card";
import ActiveUsersTable from "src/components/active-users-table";
import PendingInvites from "src/components/pending-invites";
import RoleManagement from "src/components/role-table";
import NoContentState from "src/components/no-users";
import CreateRoleModal from "src/components/create-role";
import CreatePolicyModal from "src/components/create-policy";

import { PERMISSIONS } from "src/constants/permissions";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const tabs = [
  { name: "Active Users", href: "#active", icon: UsersIcon, current: true },
  {
    name: "Pending Invites",
    href: "#pending",
    icon: UserPlusIcon,
    current: false,
  },
  {
    name: "Roles",
    href: "#roles",
    icon: BuildingOfficeIcon,
    current: false,
    permission: PERMISSIONS.MANAGE_ORGANIZATION,
  },
  {
    name: "Policies",
    href: "#policies",
    icon: CreditCardIcon,
    current: false,
    permission: PERMISSIONS.MANAGE_ORGANIZATION,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrganizationDashboard() {
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const roles = useSelector((state) => state.roles.roles);
  const policy = useSelector((state) => state.policy.policy);
  const orgLoading = useSelector((state) => state.org.isLoading);
  const policyLoading = useSelector((state) => state.policy.isLoading);
  const dispatch = useDispatch();
  const currentUserPermissions = useSelector(
    (state) => state.user.details?.role?.permissions || [],
  );
  const location = useLocation();
  const initialActiveTab = location?.state?.activeTab || "Active Users";

  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
    dispatch(rolesThunks.getRoles({}));
    dispatch(policyThunks.getPolicy({}));
  }, [dispatch]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return (
      localStorage.getItem("activeTab") || initialActiveTab || "Active Users"
    );
  });
  const [isResending, setIsResending] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [inviteIdToDelete, setInviteIdToDelete] = useState(null);
  const [isDeleteUserConfirmOpen, setIsDeleteUserConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [filteredTabs, setFilteredTabs] = useState(tabs);
  const [isCreatePolicyModalOpen, setIsCreatePolicyModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    setFilteredTabs(
      tabs.filter(
        (tab) =>
          !tab.permission || currentUserPermissions.includes(tab.permission),
      ),
    );
  }, [currentUserPermissions]);

  if (orgLoading || policyLoading) {
    return <LoadingSpinner />;
  }

  const handleFetchUsers = () => {
    dispatch(orgThunks.getOrgUsers({}));
  };

  const handleFetchRoles = () => {
    dispatch(rolesThunks.getRoles({}));
  };

  const handleFetchRolesAndUsers = () => {
    dispatch(rolesThunks.getRoles({}));
    dispatch(orgThunks.getOrgUsers({}));
  };

  const handleDeleteInvite = async (inviteId) => {
    try {
      dispatch(
        userThunks.deleteInvite(
          { data: { inviteId } },
          (err) => {
            if (!err) {
              createSuccessToast(toastMessages.INVITE_DELETED_SUCCESSFUL);
              handleFetchUsers();
              return;
            }
            createErrorToast(
              decodeAPIMessage(get(err, "response.data.error", "")),
            );
          },
          false,
        ),
      );
    } catch (error) {
      createErrorToast(toastMessages.INVITE_DELETE_ERROR);
    } finally {
      setIsDeleteConfirmOpen(false);
      setInviteIdToDelete(null);
    }
  };

  // TODO: actually show toast when resend is confirmed from backend
  const handleResendInvite = (inviteId) => {
    if (isResending) return;

    setIsResending(true);
    try {
      dispatch(userThunks.resendInvite({ data: { inviteId } }));
      createSuccessToast(toastMessages.INVITE_RESENT_SUCCESSFUL);
    } catch (error) {
      createErrorToast(toastMessages.INVITE_RESEND_ERROR);
    } finally {
      // Add a small delay before allowing another click
      setTimeout(() => {
        setIsResending(false);
      }, 2000); // 2 second delay
    }
  };

  const handleDeleteModalOpen = (inviteId) => {
    setIsDeleteConfirmOpen(true);
    setInviteIdToDelete(inviteId);
  };

  const handleDeleteUser = (userId) => {
    try {
      dispatch(
        userThunks.deleteUser(
          { data: { userId } },
          (err) => {
            if (!err) {
              createSuccessToast(toastMessages.DELETE_USER_SUCCESSFUL);
              handleFetchUsers();
              return;
            }
            createErrorToast(
              decodeAPIMessage(get(err, "response.data.error", "")),
            );
          },
          false,
        ),
      );
    } catch (error) {
      createErrorToast(toastMessages.UPDATE_ROLE_ERROR);
    }
  };

  const handleOpenDeleteUser = (userId) => {
    setIsDeleteUserConfirmOpen(true);
    setUserIdToDelete(userId);
  };

  const handleCloseDeleteUser = () => {
    setIsDeleteUserConfirmOpen(false);
    setUserIdToDelete(null);
  };

  return (
    <div className="min-h-screen p-6 mt-12">
      {/* Invite User Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        fetchUsers={handleFetchUsers}
      />

      {/* Delete Confirm Dialog */}
      <Confirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => handleDeleteInvite(inviteIdToDelete)}
        title="Delete Invite"
        message="Are you sure you want to delete this invite? This action cannot be undone."
        buttonColor="bg-red-500 hover:bg-red-600"
      />
      {/* Delete User Modal */}
      <Confirm
        isOpen={isDeleteUserConfirmOpen}
        onClose={handleCloseDeleteUser}
        onConfirm={() => handleDeleteUser(userIdToDelete)}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        buttonColor="bg-red-500 hover:bg-red-600"
      />
      {/* Create Role Modal */}
      <CreateRoleModal
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
        fetchRoles={handleFetchRoles}
      />

      {/* Create Policy Modal */}
      <CreatePolicyModal
        isOpen={isCreatePolicyModalOpen}
        onClose={() => setIsCreatePolicyModalOpen(false)}
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
          icon={UsersIcon}
          iconColor="text-indigo-500"
          iconBgColor="bg-indigo-50"
        />
        <StatsCard
          title="Active Users"
          value={
            orgUsers ? orgUsers.users?.filter((u) => u.isVerified).length : 0
          }
          icon={UserIcon}
          iconColor="text-emerald-500"
          iconBgColor="bg-emerald-50"
        />
        <StatsCard
          title="Pending Invites"
          value={
            orgUsers ? orgUsers.invites?.filter((u) => !u.isVerified).length : 0
          }
          icon={UserPlusIcon}
          iconColor="text-indigo-500"
          iconBgColor="bg-indigo-50"
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
              {filteredTabs.map((tab) => (
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
            <ActiveUsersTable
              users={orgUsers.users}
              handleOpenDeleteUser={handleOpenDeleteUser}
            />
          )}

        {activeTab === "Pending Invites" &&
          orgUsers &&
          orgUsers.invites?.length > 0 && (
            <PendingInvites
              invites={orgUsers.invites}
              handleResendInvite={handleResendInvite}
              handleDeleteModalOpen={handleDeleteModalOpen}
              isResending={isResending}
            />
          )}

        {/* Keeping permissions for future use */}
        {activeTab === "Roles" &&
          currentUserPermissions.includes(PERMISSIONS.MANAGE_ORGANIZATION) && (
            <RoleManagement
              roles={roles}
              onCreateRoleClick={() => setIsCreateRoleModalOpen(true)}
              handleFetch={handleFetchRolesAndUsers}
            />
          )}

        {/* Keeping permissions for future use */}
        {activeTab === "Policies" &&
          currentUserPermissions.includes(PERMISSIONS.MANAGE_ORGANIZATION) && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Leave Policy Management
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage leave policies and their rules
                  </p>
                </div>
                <button
                  onClick={() => setIsCreatePolicyModalOpen(true)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Policy
                </button>
              </div>
              <div className="space-y-4">
                {policy &&
                  policy.map((p) => <PolicyOverview key={p.id} policy={p} />)}
              </div>
            </>
          )}

        {/* No Content State */}
        {((activeTab === "Active Users" && !orgUsers?.users?.length) ||
          (activeTab === "Pending Invites" && !orgUsers?.invites?.length)) && (
          <NoContentState
            activeTab={activeTab}
            onInviteClick={() => setIsInviteModalOpen(true)}
          />
        )}
      </div>
    </div>
  );
}
