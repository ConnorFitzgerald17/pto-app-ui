import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";

import orgThunks from "src/state/org/thunks";
import userThunks from "src/state/user/thunks";
import departmentThunks from "src/state/department/thunks";

import LoadingSpinner from "src/components/loading-spinner";
import Confirm from "src/components/confirm";
import StatsCard from "src/components/stats-card";
import ActiveUsersTable from "src/components/active-users-table";
import PendingInvites from "src/components/pending-invites";
import InviteModal from "src/components/invite-user-modal";

import Button from "src/components/button";

import { UserIcon, UsersIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import DepartmentSelect from "src/components/department-select";
import UserRoleSelect from "src/components/user-role-select";
import Input from "src/components/input";

const User = () => {
  const dispatch = useDispatch();
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const orgLoading = useSelector((state) => state.org.isLoading);
  // State
  const [isResending, setIsResending] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [inviteIdToDelete, setInviteIdToDelete] = useState(null);
  const [isDeleteUserConfirmOpen, setIsDeleteUserConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    department: "",
  });

  // Effects
  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
  }, [dispatch]);

  // Handlers
  const handleFetchUsers = () => {
    dispatch(orgThunks.getOrgUsers({}));
  };

  const handleFetchDepartments = () => {
    dispatch(departmentThunks.getDepartment({}));
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

  const handleResendInvite = (inviteId) => {
    if (isResending) return;

    setIsResending(true);
    try {
      dispatch(userThunks.resendInvite({ data: { inviteId } }));
      createSuccessToast(toastMessages.INVITE_RESENT_SUCCESSFUL);
    } catch (error) {
      createErrorToast(toastMessages.INVITE_RESEND_ERROR);
    } finally {
      setTimeout(() => {
        setIsResending(false);
      }, 2000);
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

  const handleInviteModalOpen = () => {
    setIsInviteModalOpen(true);
  };

  const handleInviteModalClose = () => {
    setIsInviteModalOpen(false);
  };

  const filteredUsers = useMemo(() => {
    if (!orgUsers?.users) return [];

    return orgUsers.users.filter((user) => {
      const matchesSearch = filters.search
        ? (user.firstName + " " + user.lastName + " " + user.email)
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        : true;

      const matchesRole = filters.role ? user.role.name === filters.role : true;

      const matchesDepartment = filters.department
        ? user.departmentId === filters.department
        : true;

      return matchesSearch && matchesRole && matchesDepartment;
    });
  }, [orgUsers?.users, filters]);

  const filteredInvites = useMemo(() => {
    if (!orgUsers?.invites) return [];

    return orgUsers.invites.filter((invite) => {
      const matchesSearch = filters.search
        ? invite.email.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      const matchesRole = filters.role ? invite.role === filters.role : true;

      const matchesDepartment = filters.department
        ? invite.departmentId === filters.department
        : true;

      return matchesSearch && matchesRole && matchesDepartment;
    });
  }, [orgUsers?.invites, filters]);

  if (orgLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 mt-2">
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleInviteModalClose}
        fetchUsers={handleFetchUsers}
      />
      <Confirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => handleDeleteInvite(inviteIdToDelete)}
        title="Delete Invite"
        message="Are you sure you want to delete this invite? This action cannot be undone."
        buttonColor="bg-red-500 hover:bg-red-600"
      />

      <Confirm
        isOpen={isDeleteUserConfirmOpen}
        onClose={() => setIsDeleteUserConfirmOpen(false)}
        onConfirm={() => handleDeleteUser(userIdToDelete)}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        buttonColor="bg-red-500 hover:bg-red-600"
      />

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team members and their roles
          </p>
        </div>
        <Button variant="primary" onClick={handleInviteModalOpen}>
          <div className="flex items-center gap-2">
            <UserPlusIcon className="h-5 w-5" />
            Invite Users
          </div>
        </Button>
      </div>

      {/* Stats Cards */}
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

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <Input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by name or email"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div>
          <UserRoleSelect
            value={filters.role}
            onChange={(value) => setFilters({ ...filters, role: value })}
          />
        </div>
        <div>
          <DepartmentSelect
            value={filters.department}
            onChange={(value) => setFilters({ ...filters, department: value })}
          />
        </div>
        <div className="flex items-end">
          <button
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            onClick={() => setFilters({ search: "", role: "", department: "" })}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <ActiveUsersTable
          users={filteredUsers}
          handleOpenDeleteUser={(userId) => {
            setIsDeleteUserConfirmOpen(true);
            setUserIdToDelete(userId);
          }}
          fetchUsers={handleFetchUsers}
          fetchDepartments={handleFetchDepartments}
        />

        {orgUsers.invites?.length > 0 && (
          <PendingInvites
            invites={filteredInvites}
            handleResendInvite={handleResendInvite}
            handleDeleteModalOpen={handleDeleteModalOpen}
            isResending={isResending}
          />
        )}
      </div>
    </div>
  );
};

export default User;
