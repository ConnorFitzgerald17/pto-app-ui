import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "src/components/button";
import StatsCard from "src/components/stats-card";
import departmentThunks from "src/state/department/thunks";
import LoadingSpinner from "src/components/loading-spinner";
import ViewDepartment from "src/components/view-department";
import EditDepartment from "src/components/edit-department";
import CreateDepartment from "src/components/create-department";
import orgThunks from "src/state/org/thunks";
import policyThunks from "src/state/policy/thunks";

const DepartmentRow = ({
  department,
  level = 0,
  setViewDepartment,
  setEditDepartment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = department.children?.length > 0;

  const handleEditDepartment = () => {
    setEditDepartment(department);
  };

  const handleViewDepartment = () => {
    setViewDepartment(department);
  };
  return (
    <>
      <tr
        className={`hover:bg-gray-50 ${
          level > 0 ? "bg-gray-50 border-l-4 border-l-indigo-300" : ""
        }`}
      >
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
                    <ChevronDownIcon className="h-5 w-5 text-indigo-500" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-indigo-500" />
                  )}
                </button>
              )}
              <div className="flex items-center">
                <div
                  className={`h-10 w-10 flex-shrink-0 ${
                    level > 0 ? "scale-90" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      level > 0 ? "bg-indigo-100" : "bg-indigo-50"
                    }`}
                  >
                    <BuildingOfficeIcon
                      className={`h-6 w-6 ${
                        level > 0 ? "text-indigo-500" : "text-indigo-600"
                      }`}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <div
                    className={`font-medium ${
                      level > 0 ? "text-indigo-600" : "text-gray-900"
                    }`}
                  >
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
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell relative">
          {department.managers ? (
            <div className="flex items-center gap-2">
              <span>
                {Array.isArray(department.managers)
                  ? department.managers[0]
                  : department.managers}
              </span>
              {Array.isArray(department.managers) &&
                department.managers.length > 1 && (
                  <div className="group relative">
                    <span className="inline-flex items-center rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800 cursor-pointer">
                      +{department.managers.length - 1}
                    </span>
                    <div className="absolute left-0 top-full z-[500] mt-2 hidden w-48 rounded-md bg-gray-800 p-2 text-xs text-white shadow-lg group-hover:block">
                      {department.managers.slice(1).map((manager, index) => (
                        <div key={index} className="py-1">
                          {manager}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            "N/A"
          )}
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
          {department.policies?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                {department.policies[0]}
              </span>
              {department.policies.length > 1 && (
                <div className="group relative">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 cursor-pointer">
                    +{department.policies.length - 1}
                  </span>
                  <div className="absolute left-0 top-full z-[500] mt-2 hidden w-48 rounded-md bg-gray-800 p-2 text-xs text-white shadow-lg group-hover:block">
                    {department.policies.slice(1).map((policy, index) => (
                      <div key={index} className="py-1">
                        {policy}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            "N/A"
          )}
        </td>
        <td className="px-3 py-4 text-sm text-gray-500">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              department.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {department.status}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
          <div className="flex justify-end gap-2">
            <button
              onClick={handleEditDepartment}
              className="text-gray-600 hover:text-indigo-600"
            >
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleViewDepartment}
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
            setEditDepartment={setEditDepartment}
            setViewDepartment={setViewDepartment}
          />
        ))}
    </>
  );
};

const Department = () => {
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.department.department);
  const totalDepartmentCount = useSelector(
    (state) => state.department.totalDepartmentCount,
  );
  const departmentsLoading = useSelector((state) => state.department.isLoading);
  const [viewDepartment, setViewDepartment] = useState(null);
  const [editDepartment, setEditDepartment] = useState(null);
  const [createDepartment, setCreateDepartment] = useState(false);

  useEffect(() => {
    dispatch(departmentThunks.getDepartment());
    dispatch(orgThunks.getOrgUsers());
    dispatch(policyThunks.getPolicy());
  }, []);

  if (departmentsLoading) {
    return <LoadingSpinner />;
  }

  const managers = [];
  const policies = [];

  const handleCreateDepartment = () => {
    setCreateDepartment(true);
  };

  const getAverageTeamSize = () => {
    if (!departments || !departments.length) return 0;

    let totalTeamSize = 0;
    let totalDepartments = 0;

    const calculateTeamSize = (department) => {
      totalTeamSize += department.directCount || 0;
      totalDepartments++;

      if (department.children?.length) {
        department.children.forEach((child) => calculateTeamSize(child));
      }
    };

    departments.forEach((department) => calculateTeamSize(department));

    return totalDepartments ? Math.round(totalTeamSize / totalDepartments) : 0;
  };

  return (
    <>
      {createDepartment && (
        <CreateDepartment
          isOpen={!!createDepartment}
          onClose={() => setCreateDepartment(false)}
        />
      )}
      {viewDepartment && (
        <ViewDepartment
          isOpen={!!viewDepartment}
          onClose={() => setViewDepartment(false)}
          department={viewDepartment}
        />
      )}

      <EditDepartment
        isOpen={!!editDepartment}
        onClose={() => setEditDepartment(false)}
        department={editDepartment}
        managers={managers || []}
        policies={policies || []}
      />
      <div className="p-6 mt-2">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Departments (in progress)
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage departments and their policies
            </p>
          </div>
          <Button variant="primary" onClick={handleCreateDepartment}>
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
            value={totalDepartmentCount}
            icon={BuildingOfficeIcon}
            iconColor="text-indigo-500"
            iconBgColor="bg-indigo-50"
          />
          <StatsCard
            title="Avg. Team Size"
            value={getAverageTeamSize()}
            icon={UserGroupIcon}
            iconColor="text-emerald-500"
            iconBgColor="bg-emerald-50"
          />
          <StatsCard
            title="Departments w/o Lead"
            value={departments.filter((d) => !d.manager).length}
            icon={ExclamationCircleIcon}
            iconColor="text-red-500"
            iconBgColor="bg-red-50"
          />
        </div>

        {/* Departments Table */}
        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow">
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
