import { useSelector } from "react-redux";
import { ROLE_LABELS, ROLE_LEVELS } from "src/constants/roles";

const UserRoleSelect = ({ value, onChange, disabled = false }) => {
  const currentUserRoleLevel = useSelector(
    (state) => state.user.details.role.level,
  );
  const currentUserRoleScope = useSelector(
    (state) => state.user.details.role.scope,
  );

  // Filter roles based on scope and user's own role level
  const availableRoles = Object.entries(ROLE_LABELS).filter(([roleKey]) => {
    const roleLevel = ROLE_LEVELS[roleKey];

    // Can't assign roles higher than your own level
    if (roleLevel > currentUserRoleLevel) {
      return false;
    }

    // Filter by scope (GLOBAL, DEPARTMENT, TEAM)
    switch (currentUserRoleScope) {
      case "TEAM":
        return ["TEAM_LEAD", "EMPLOYEE"].includes(roleKey);
      case "DEPARTMENT":
        return ["DEPARTMENT_HEAD", "TEAM_LEAD", "EMPLOYEE"].includes(roleKey);
      case "GLOBAL":
        return true;
      default:
        return false;
    }
  });

  return (
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <select
        id="role"
        name="role"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Select a role</option>
        {availableRoles.map(([roleKey, label]) => (
          <option key={roleKey} value={roleKey}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserRoleSelect;
