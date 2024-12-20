import { types } from ".";

export const setRolesLoading = (loading) => {
  return {
    type: types.SET_ROLES_LOADING,
    payload: loading,
  };
};
