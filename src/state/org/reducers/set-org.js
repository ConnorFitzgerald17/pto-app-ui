export const setOrg = ({ state, action }) => {
  return {
    ...state,
    org: action.payload.org,
    isLoading: false,
  };
};
