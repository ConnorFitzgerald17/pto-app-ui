export const setRoles = ({ state, action }) => {
  const formattedRoles = action.payload.roles.map((role) => ({
    value: role.roleId,
    label: role.name,
    description: role.description,
  }));

  return {
    ...state,
    roles: action.payload.roles,
    dropdownRoles: formattedRoles,
    isLoading: false,
  };
};
