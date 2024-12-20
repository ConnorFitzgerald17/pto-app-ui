import { types } from "../actions";

export const setLoading = (loading) => {
  return {
    type: types.SET_ORG_LOADING,
    payload: loading,
  };
};
