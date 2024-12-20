import { types } from "../actions";

export const setLoading = (isLoading) => {
  return {
    type: types.SET_ORG_LOADING,
    payload: { isLoading },
  };
};
