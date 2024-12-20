import { types } from ".";

export const setRole = (role) => {
  return {
    type: types.SET_ROLE,
    payload: role,
  };
};
