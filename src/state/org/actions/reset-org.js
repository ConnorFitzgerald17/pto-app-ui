import { types } from "../actions";

export const resetOrg = () => {
  return {
    type: types.RESET_ORG,
  };
};
