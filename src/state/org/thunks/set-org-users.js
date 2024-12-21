export const setOrgUsers = ({ state, action }) => {
  return {
    ...state,
    orgUsers: action.payload.orgUsers,
    isLoading: false,
  };
};
