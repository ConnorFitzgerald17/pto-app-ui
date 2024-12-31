import React from "react";
import NoContentState from "../no-users";

import { ROLE_LABELS } from "src/constants/roles";

const PendingInvites = ({
  invites,
  handleResendInvite,
  handleDeleteModalOpen,
  isResending,
}) => {
  if (!invites?.length) {
    return (
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Pending Invites
        </h2>
        <NoContentState
          // onClick={() => setIsInviteModalOpen(true)}
          message="No pending invites found."
          buttonText="Invite Users"
        />
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-4 text-lg font-medium text-gray-900">
        Pending Invites
      </h2>
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
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {invites.map((invite) => (
              <tr key={invite.email}>
                <td className="w-full max-w-0 py-4 px-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full">
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
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Email</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          {invite.email}
                        </dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-1 truncate text-gray-500">
                          {ROLE_LABELS[invite.role]}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {invite.email}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {ROLE_LABELS[invite.role]}
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-yellow-100 text-yellow-800`}
                  >
                    Invited
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleResendInvite(invite.inviteId)}
                      disabled={isResending}
                      className={` ${
                        isResending
                          ? "cursor-not-allowed text-gray-500 hover:text-gray-500"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      Resend
                    </button>
                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => handleDeleteModalOpen(invite.inviteId)}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingInvites;
