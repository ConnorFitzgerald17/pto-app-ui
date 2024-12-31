import { types } from ".";

export const setDepartment = (department) => {
  return {
    type: types.SET_DEPARTMENT,
    payload: department,
  };
};
