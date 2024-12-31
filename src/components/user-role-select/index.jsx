import { useSelector } from "react-redux";
import { ROLE_LABELS, ROLE_LEVELS } from "src/constants/roles";

import SelectMenu from "src/components/select";

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

  const options = availableRoles.map(([roleKey, label]) => ({
    value: roleKey,
    label,
  }));

  return (
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <SelectMenu
        options={options}
        value={value}
        onChange={(value) => onChange(value)}
        disabled={disabled}
      />
    </div>
  );
};

export default UserRoleSelect;
