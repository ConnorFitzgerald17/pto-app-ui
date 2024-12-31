import { types } from ".";

export const updateDepartment = (department) => ({
  type: types.UPDATE_DEPARTMENT,
  payload: department,
});
