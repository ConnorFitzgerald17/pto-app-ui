import { types } from "./";

export const setUser = ({ details, token }) => {
  return {
    type: types.SET_USER,
    payload: {
      details,
      token,
    },
  };
};
