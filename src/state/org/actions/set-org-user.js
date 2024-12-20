import { types } from ".";

export const setOrgUser = (orgUser) => {
  return {
    type: types.SET_ORG_USER,
    payload: orgUser,
  };
};
