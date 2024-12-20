export const setOrgUser = ({ state, action }) => {
  return {
    ...state,
    orgUser: action.payload.orgUser,
    isLoading: false,
  };
};
