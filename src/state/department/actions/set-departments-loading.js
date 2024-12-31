import { types } from ".";

export const setDepartmentLoading = (isLoading) => {
  return {
    type: types.SET_DEPARTMENT_LOADING,
    payload: { isLoading },
  };
};
