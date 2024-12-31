import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Button from "src/components/button";
import StatsCard from "src/components/stats-card";
import departmentThunks from "src/state/department/thunks";
import LoadingSpinner from "src/components/loading-spinner";
import ViewDepartment from "src/components/view-department";
import EditDepartment from "src/components/edit-department";

const DepartmentRow = ({ department, level = 0, setViewDepartment, setEditDepartment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = department.children?.length > 0;

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
          <div className="flex items-center">
            <div
              style={{ paddingLeft: `${level * 2}rem` }}
              className="flex items-center"
            >
              {hasChildren && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mr-2 p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              )}
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                    <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {department.name}
                  </div>
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Lead</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {department.manager || "N/A"}
                    </dd>
                    <dt className="sr-only">Policies</dt>
                    <dd className="mt-1 truncate text-gray-500">
                      {department.policies?.join(", ")}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          {department.manager || "N/A"}
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
          <div className="flex flex-col">
            <span>{department.directCount || 0}</span>
            {department.children?.length > 0 && (
              <span className="text-xs text-gray-400">
                Total: {department.totalCount || 0}
              </span>
            )}
          </div>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          <div className="flex flex-wrap gap-1">
            {department.policies?.length > 0 ? (
              department.policies?.map((policy) => (
                <span
                  key={policy}
                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
                >
                  {policy}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
                No policies
              </span>
            )}
          </div>
        </td>
        <td className="px-3 py-4 text-sm text-gray-500">
          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
            {department.status}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setEditDepartment(department);
              }}
              className="text-gray-600 hover:text-indigo-600"
            >
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => {
                setViewDepartment(department);
              }}
              className="text-gray-600 hover:text-indigo-600"
            >
              View
            </button>
          </div>
        </td>
      </tr>
      {isExpanded &&
        department.children?.map((child) => (
          <DepartmentRow
            key={child.departmentId}
            department={child}
            level={level + 1}
          />
        ))}
    </>
  );
};

const Department = () => {
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.department.department);
  const departmentsLoading = useSelector((state) => state.department.isLoading);
  const [viewDepartment, setViewDepartment] = useState(null);
  const [editDepartment, setEditDepartment] = useState(null);

  useEffect(() => {
    dispatch(departmentThunks.getDepartment());
  }, [dispatch]);

  if (departmentsLoading) {
    return <LoadingSpinner />;
  }

  console.log(departments);

  const managers = [];
  const policies = [];

  // In your render method:

  return (
    <>
      <ViewDepartment
        isOpen={!!viewDepartment}
        onClose={() => setViewDepartment(null)}
        department={viewDepartment}
      />

      <EditDepartment
        isOpen={!!editDepartment}
        onClose={() => setEditDepartment(null)}
        department={editDepartment}
        managers={managers || []}
        policies={policies || []}
      />
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
          <Button variant="primary">
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
            value={departments.length}
            icon={BuildingOfficeIcon}
            iconColor="text-indigo-500"
            iconBgColor="bg-indigo-50"
          />
          <StatsCard
            title="Total Employees"
            value={departments.reduce((acc, dept) => acc + dept.headCount, 0)}
            icon={UserGroupIcon}
            iconColor="text-emerald-500"
            iconBgColor="bg-emerald-50"
          />
          <StatsCard
            title="Active Policies"
            value={
              [...new Set(departments.flatMap((dept) => dept.policies))].length
            }
            icon={DocumentIcon}
            iconColor="text-blue-500"
            iconBgColor="bg-blue-50"
          />
        </div>

        {/* Departments Table */}
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Lead
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Members
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Policies
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {departments.map((department) => (
                <DepartmentRow
                  key={department.departmentId}
                  department={department}
                  setViewDepartment={setViewDepartment}
                  setEditDepartment={setEditDepartment}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Department Modal would go here */}
      </div>
    </>
  );
};

export default Department;
