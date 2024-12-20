import { types } from ".";

export const setOrg = (org) => {
  return {
    type: types.SET_ORG,
    payload: org,
  };
};
