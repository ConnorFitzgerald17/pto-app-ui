export const setOrgRoles = ({ state, action }) => {
  return {
    ...state,
    orgRoles: action.payload.orgRoles,
    isLoading: false,
  };
};
