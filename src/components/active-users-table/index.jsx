import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "src/components/ui/tooltip";
import EditUser from "src/components/edit-user";
import NoContentState from "src/components/no-users";

const ActiveUsersTable = ({ users, handleOpenDeleteUser }) => {
  const currentUser = useSelector((state) => state.user.details);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleCloseEditUser = () => {
    setIsOpen(false);
    setUserId(null);
  };

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
      {userId && (
        <EditUser
          isOpen={isOpen}
          onClose={handleCloseEditUser}
          userId={userId}
        />
      )}
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">Active Users</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Email
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Role
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
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
                            {user.role.name}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {user.email}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {user.role.name}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    <div
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.isVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.isVerified ? "Active" : "Pending"}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        className="text-gray-600 hover:text-indigo-600"
                        onClick={() => {
                          setUserId(user.userId);
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
        </div>
      </div>
    </>
  );
};

export default ActiveUsersTable;
