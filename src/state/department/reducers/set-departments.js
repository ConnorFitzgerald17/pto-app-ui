export const setDepartment = ({ state, action }) => {
  return {
    ...state,
    department: action.payload.department,
    totalDepartmentCount: action.payload.totalDepartmentCount,
    isLoading: false,
  };
};
