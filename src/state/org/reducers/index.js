import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetOrg } from "./reset-org";
import { setLoading } from "./set-org-loading";
import { setOrg } from "./set-org";
import { setOrgUsers } from "./set-org-users";

export const initialState = {
  isLoading: true,
  org: null,
  orgUsers: null,
};

const actionMap = {
  [types.RESET_ORG]: resetOrg,
  [types.SET_LOADING]: setLoading,
  [types.SET_ORG]: setOrg,
  [types.SET_ORG_USERS]: setOrgUsers,
};

export default reducerFactory(actionMap, initialState);
