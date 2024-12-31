export const setDepartment = ({ state, action }) => {
  return {
    ...state,
    department: action.payload.department,
    isLoading: false,
  };
};
