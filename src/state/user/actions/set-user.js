import { types } from "./";

export const setUser = ({ details, token, role }) => {
  return {
    type: types.SET_USER,
    payload: {
      details,
      token,
      role,
    },
  };
};
