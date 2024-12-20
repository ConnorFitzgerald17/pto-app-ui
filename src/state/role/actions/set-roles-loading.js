import { types } from ".";

export const setRolesLoading = (isLoading) => {
  return {
    type: types.SET_ROLES_LOADING,
    payload: { isLoading },
  };
};
