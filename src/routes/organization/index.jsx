import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import orgThunks from "src/state/org/thunks";

export default function OrganizationDashboard() {
  const orgUsers = useSelector((state) => state.org.orgUsers);
  const orgLoading = useSelector((state) => state.org.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
  }, [dispatch]);

  console.log("====================================");
  console.log(orgUsers);
  console.log("====================================");

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  if (orgLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Invite New User
                </h3>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  />
                  <select className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
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
