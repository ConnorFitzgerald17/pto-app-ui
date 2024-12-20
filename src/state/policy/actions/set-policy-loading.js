import { types } from ".";

export const setPolicyLoading = (isLoading) => {
  return {
    type: types.SET_POLICY_LOADING,
    payload: { isLoading },
  };
};
