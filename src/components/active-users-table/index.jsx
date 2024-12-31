import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "src/components/ui/tooltip";

import { ROLE_LABELS } from "src/constants/roles";
import userThunks from "src/state/user/thunks";
import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";
import { toastMessages } from "src/constants/toast-messages";

import EditUser from "src/components/edit-user";
import NoContentState from "src/components/no-users";
import Confirm from "src/components/confirm";
import SelectMenu from "../select";
import RoleChanger from "src/components/active-users-table/bulk-components/role-changer";
import DepartmentChanger from "src/components/active-users-table/bulk-components/department-changer";

const bulkActions = [
  {
    label: "Change Role",
    value: "role",
  },
  {
    label: "Change Department",
    value: "department",
  },
  {
    label: "Remove Users",
    value: "delete",
  },
];

const ActiveUsersTable = ({
  users,
  handleOpenDeleteUser,
  fetchUsers,
  fetchDepartments,
}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.details);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersPerPage = 10;

  // Bulk actions
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [roleChangerOpen, setRoleChangerOpen] = useState(false);
  const [departmentChangerOpen, setDepartmentChangerOpen] = useState(false);

  // Calculate pagination values
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil((users?.length || 0) / usersPerPage);

  // Reset pagination when users list changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedUsers([]); // Reset selections when users change
  }, [users]);

  const handleCloseEditUser = () => {
    setIsOpen(false);
    setUser(null);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all users except the current user
      setSelectedUsers(
        currentUsers
          .filter((user) => user.userId !== currentUser.userId)
          .map((user) => user.userId),
      );
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case "delete":
        setConfirmOpen(true);
        break;
      case "role":
        setRoleChangerOpen(true);
        break;
      case "department":
        setDepartmentChangerOpen(true);
        break;
      default:
        break;
    }
  };

  const handleBulkDelete = () => {
    dispatch(
      userThunks.deleteUsers(
        { data: { userIds: selectedUsers } },
        (err) => {
          if (!err) {
            createSuccessToast(toastMessages.BULK_DELETE_SUCCESSFUL);
            fetchUsers();
            return;
          }
          createErrorToast(
            decodeAPIMessage(get(err, "response.data.error", "")),
          );
        },
        false,
      ),
    );
    return;
  };

  const handleBulkChangeRole = (role) => {
    dispatch(
      userThunks.changeRoles(
        { data: { userIds: selectedUsers, role: role } },
        (err) => {
          if (!err) {
            createSuccessToast(toastMessages.BULK_CHANGE_ROLE_SUCCESSFUL);
            fetchUsers();
            setRoleChangerOpen(false);
            return;
          }
          createErrorToast(
            decodeAPIMessage(get(err, "response.data.error", "")),
          );
        },
      ),
    );
    setRoleChangerOpen(false);
  };

  const handleBulkChangeDepartment = (department) => {
    dispatch(
      userThunks.changeDepartments(
        { data: { userIds: selectedUsers, department: department } },
        (err) => {
          if (!err) {
            createSuccessToast(toastMessages.BULK_CHANGE_DEPARTMENT_SUCCESSFUL);
            fetchUsers();
            fetchDepartments();
            setDepartmentChangerOpen(false);
            return;
          }
          createErrorToast(
            decodeAPIMessage(get(err, "response.data.error", "")),
          );
        },
      ),
    );
    setDepartmentChangerOpen(false);
  };

  // Update the checkbox checked state
  const selectableUsers = currentUsers.filter(
    (user) => user.userId !== currentUser.userId,
  );
  const allSelectableSelected =
    selectableUsers.length > 0 &&
    selectableUsers.every((user) => selectedUsers.includes(user.userId));

  if (!users?.length) {
    return (
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">Active Users</h2>
        <NoContentState
          message="No active users found."
          buttonText="Invite Users"
        />
      </div>
    );
  }

  return (
    <>
      {user && (
        <EditUser isOpen={isOpen} onClose={handleCloseEditUser} user={user} />
      )}
      {confirmOpen && (
        <Confirm
          isOpen={confirmOpen}
          onClose={() => {
            setConfirmOpen(false);
            setSelectedUsers([]);
          }}
          onConfirm={handleBulkDelete}
          title={"Remove Users"}
          message={
            "Are you sure you want to remove these users? This action cannot be undone."
          }
          confirmText="Remove"
          cancelText="Cancel"
          buttonColor="bg-red-500 hover:bg-red-600 text-white"
        />
      )}
      {roleChangerOpen && (
        <RoleChanger
          open={roleChangerOpen}
          users={selectedUsers}
          onChange={handleBulkChangeRole}
          onClose={() => {
            setRoleChangerOpen(false);
            setSelectedUsers([]);
          }}
        />
      )}
      {departmentChangerOpen && (
        <DepartmentChanger
          open={departmentChangerOpen}
          users={selectedUsers}
          onChange={handleBulkChangeDepartment}
          onClose={() => {
            setDepartmentChangerOpen(false);
            setSelectedUsers([]);
          }}
        />
      )}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Active Users</h2>
          {selectedUsers.length > 0 && (
            <div className="flex  items-center gap-2">
              <span className="text-sm text-gray-500 w-[150px]">
                {selectedUsers.length} selected
              </span>
              <SelectMenu
                options={bulkActions}
                onChange={handleBulkAction}
                placeholder="Bulk Actions"
                className="w-[180px]"
              />
            </div>
          )}
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-3 py-3.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={allSelectableSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Email
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Role
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Department
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="w-12 px-3 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => handleSelectUser(user.userId)}
                      disabled={user.userId === currentUser.userId}
                    />
                  </td>
                  <td className="w-full max-w-0 py-4 px-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                          {user.firstName.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {`${user.firstName} ${user.lastName}`}
                        </div>
                        {/* Mobile-only stacked content */}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Email</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {user.email}
                          </dd>
                          <dt className="sr-only">Role</dt>
                          <dd className="mt-1 truncate text-gray-500">
                            {ROLE_LABELS[user.role.name]}
                          </dd>
                          <dt className="sr-only">Department</dt>
                          <dd className="mt-1 truncate text-gray-500">
                            {user.department ? user.department : "N/A"}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {user.email}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {ROLE_LABELS[user.role.name]}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {user.department ? user.department : "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        className="text-gray-600 hover:text-indigo-600"
                        onClick={() => {
                          setUser(user);
                          setIsOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      {currentUser.userId === user.userId ? (
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="text-gray-600 hover:text-indigo-600 cursor-not-allowed"
                                  disabled
                                >
                                  Remove
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>You cannot remove yourself</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>
                      ) : (
                        <button
                          className="text-gray-600 hover:text-indigo-600"
                          onClick={() => handleOpenDeleteUser(user.userId)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add pagination controls */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastUser, users?.length)}
                  </span>{" "}
                  of <span className="font-medium">{users?.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveUsersTable;
