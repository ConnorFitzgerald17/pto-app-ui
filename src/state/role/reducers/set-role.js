export const setRole = ({ state, action }) => {
  return {
    ...state,
    role: action.payload.role,
    isLoading: false,
  };
};
