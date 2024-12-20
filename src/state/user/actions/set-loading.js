import { types } from "./";

export const setLoading = (isLoading) => {
  return {
    type: types.SET_LOADING,
    payload: {
      isLoading,
    },
  };
};
