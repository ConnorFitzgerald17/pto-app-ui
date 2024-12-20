export const setPolicy = ({ state, action }) => {
  return {
    ...state,
    policy: action.payload.policy,
    isLoading: false,
  };
};
