import { types } from ".";

export const setOrgRoles = (orgRoles) => {
  return {
    type: types.SET_ORG_ROLES,
    payload: orgRoles,
  };
};
