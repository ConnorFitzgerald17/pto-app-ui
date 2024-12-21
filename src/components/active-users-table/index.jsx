import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "src/components/ui/tooltip";
import EditUser from "src/components/edit-user";

const ActiveUsersTable = ({ users, handleOpenDeleteUser }) => {
  const currentUser = useSelector((state) => state.user.details);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleCloseEditUser = () => {
    setIsOpen(false);
    setUserId(null);
  };

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
              {users.map((user) => (
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
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {
                        setUserId(user.userId);
                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    {currentUser.userId === user.userId ? (
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className="ml-4 text-gray-600 hover:text-gray-900 cursor-not-allowed"
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
                        className="ml-4 text-red-600 hover:text-red-900"
                        onClick={() => handleOpenDeleteUser(user.userId)}
                      >
                        Remove
                      </button>
                    )}
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
