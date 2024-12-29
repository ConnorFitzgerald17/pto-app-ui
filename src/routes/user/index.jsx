import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";

import orgThunks from "src/state/org/thunks";
import rolesThunks from "src/state/role/thunks";
import userThunks from "src/state/user/thunks";

import LoadingSpinner from "src/components/loading-spinner";
import Confirm from "src/components/confirm";
import StatsCard from "src/components/stats-card";
import ActiveUsersTable from "src/components/active-users-table";
import PendingInvites from "src/components/pending-invites";

import Button from "src/components/button";

import { UserIcon, UsersIcon, UserPlusIcon } from "@heroicons/react/20/solid";

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

  // Effects
  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
    dispatch(rolesThunks.getRoles({}));
  }, [dispatch]);

  // Handlers
  const handleFetchUsers = () => {
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

  if (orgLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 mt-2">
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

      {/* <EditUser
        isOpen={isEditUserOpen}
        onClose={() => {
          setIsEditUserOpen(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
      /> */}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team members and their roles
          </p>
        </div>
        <Button
          variant="primary"
          // onClick={() => setIsInviteModalOpen(true)}
        >
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

      {/* Content based on active tab */}
      <div className="space-y-8">
        <ActiveUsersTable
          users={orgUsers.users}
          handleOpenDeleteUser={(userId) => {
            setIsDeleteUserConfirmOpen(true);
            setUserIdToDelete(userId);
          }}
        />

        {orgUsers.invites?.length > 0 && (
          <PendingInvites
            invites={orgUsers.invites}
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
