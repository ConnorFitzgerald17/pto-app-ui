import { types } from ".";

export const setOrgUsers = (orgUsers) => {
  return {
    type: types.SET_ORG_USERS,
    payload: orgUsers,
  };
};
