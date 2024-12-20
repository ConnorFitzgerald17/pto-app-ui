import { types } from ".";

export const setRoles = (roles) => {
  return {
    type: types.SET_ROLES,
    payload: roles,
  };
};
