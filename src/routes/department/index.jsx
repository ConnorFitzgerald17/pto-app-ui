import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  PlusIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Button from "src/components/button";
import StatsCard from "src/components/stats-card";

// Mock data (replace with actual data from API)
const departmentData = [
  {
    id: 1,
    name: "Engineering",
    headCount: 24,
    lead: "John Doe",
    policies: ["Standard PTO", "Remote Work"],
    status: "active",
  },
  {
    id: 2,
    name: "Sales",
    headCount: 15,
    lead: "Jane Smith",
    policies: ["Standard PTO", "Sales Leave"],
    status: "active",
  },
  {
    id: 3,
    name: "Marketing",
    headCount: 12,
    lead: "Mike Johnson",
    policies: ["Standard PTO"],
    status: "active",
  },
];

const Department = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="p-6 mt-2">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Departments (TODO)
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage departments and their policies
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          <div className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create Department
          </div>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          title="Total Departments"
          value={departmentData.length}
          icon={BuildingOfficeIcon}
          iconColor="text-indigo-500"
          iconBgColor="bg-indigo-50"
        />
        <StatsCard
          title="Total Employees"
          value={departmentData.reduce((acc, dept) => acc + dept.headCount, 0)}
          icon={UserGroupIcon}
          iconColor="text-emerald-500"
          iconBgColor="bg-emerald-50"
        />
        <StatsCard
          title="Active Policies"
          value={
            [...new Set(departmentData.flatMap((dept) => dept.policies))].length
          }
          icon={DocumentIcon}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-50"
        />
      </div>

      {/* Departments Table */}
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Members
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Policies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {departmentData.map((department) => (
              <tr key={department.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                        <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {department.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{department.lead}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {department.headCount}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {department.policies.map((policy) => (
                      <span
                        key={policy}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                      >
                        {policy}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    {department.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        /* Handle edit */
                      }}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => {
                        /* Handle view details */
                      }}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Department Modal would go here */}
    </div>
  );
};

export default Department;
