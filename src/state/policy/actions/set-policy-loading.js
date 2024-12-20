import { types } from ".";

export const setPolicyLoading = (loading) => {
  return {
    type: types.SET_POLICY_LOADING,
    payload: loading,
  };
};
