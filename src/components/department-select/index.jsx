import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ROLE_LEVELS } from "src/constants/roles";

import departmentsThunks from "src/state/department/thunks";

const DepartmentSelect = ({ value, onChange, disabled = false }) => {
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.department.department);
  const currentUserRole = useSelector((state) => state.user.details.role);
  const currentUserDepartmentId = useSelector(
    (state) => state.user.details.departmentId,
  );
  useEffect(() => {
    dispatch(departmentsThunks.getDepartment());
  }, [dispatch]);

  const filterDepartmentsByAccess = (departments, role, userDepartmentId) => {
    return departments.filter((dept) => {
      // Super Admin and HR Admin can see all departments
      if (role.level >= ROLE_LEVELS.HR_ADMIN) {
        return true;
      }

      // Department Head can only see their department and sub-departments
      if (
        role.level === ROLE_LEVELS.DEPARTMENT_HEAD &&
        (dept.departmentId === userDepartmentId ||
          isSubDepartment(dept, userDepartmentId, departments))
      ) {
        return true;
      }

      // Team Lead can only see their department
      if (
        role.level === ROLE_LEVELS.TEAM_LEAD &&
        dept.departmentId === userDepartmentId
      ) {
        return true;
      }

      return false;
    });
  };

  const isSubDepartment = (dept, parentId, allDepartments) => {
    let current = dept;
    while (current.parentDepartmentId) {
      if (current.parentDepartmentId === parentId) {
        return true;
      }
      current = allDepartments.find(
        (d) => d.departmentId === current.parentDepartmentId,
      );
      if (!current) break;
    }
    return false;
  };

  const flattenDepartments = (departments, level = 0, result = []) => {
    departments.forEach((dept) => {
      result.push({ ...dept, level });
      if (dept.children && dept.children.length > 0) {
        flattenDepartments(dept.children, level + 1, result);
      }
    });
    return result;
  };

  const renderDepartmentOptions = (departments) => {
    const flatDepartments = flattenDepartments(departments);

    return flatDepartments.map((dept) => (
      <option key={dept.departmentId} value={dept.departmentId}>
        {"  ".repeat(dept.level)}
        {dept.name}
        {dept.directCount ? ` (${dept.directCount})` : ""}
      </option>
    ));
  };

  const accessibleDepartments = filterDepartmentsByAccess(
    departments || [],
    currentUserRole,
    currentUserDepartmentId,
  );

  return (
    <div>
      <label
        htmlFor="department"
        className="block text-sm font-medium text-gray-700"
      >
        Department
      </label>
      <select
        id="department"
        name="department"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Select a department</option>
        {renderDepartmentOptions(accessibleDepartments)}
      </select>
    </div>
  );
};

export default DepartmentSelect;