export const setLoading = ({ state, action }) => {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
};
