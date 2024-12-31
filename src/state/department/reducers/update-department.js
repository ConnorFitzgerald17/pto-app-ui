export const updateDepartment = ({ state, action }) => {
  const updatedDepartment = action.payload;

  const updateDepartmentInTree = (departments) => {
    return departments.map((dept) => {
      if (dept.departmentId === updatedDepartment.departmentId) {
        return { ...dept, ...updatedDepartment };
      }
      if (dept.children) {
        return {
          ...dept,
          children: updateDepartmentInTree(dept.children),
        };
      }
      return dept;
    });
  };

  return {
    ...state,
    department: updateDepartmentInTree(state.department),
    isLoading: false,
  };
};
