import { types } from ".";

export const setPolicy = (policy) => {
  return {
    type: types.SET_POLICY,
    payload: policy,
  };
};
