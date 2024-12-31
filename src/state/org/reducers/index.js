import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetOrg } from "./reset-org";
import { setLoading } from "./set-org-loading";
import { setOrg } from "./set-org";
import { setOrgUsers } from "./set-org-users";
import { setOrgUser } from "./set-org-user";
export const initialState = {
  isLoading: true,
  org: null,
  orgUsers: null,
  orgUser: null,
};

const actionMap = {
  [types.RESET_ORG]: resetOrg,
  [types.SET_LOADING]: setLoading,
  [types.SET_ORG]: setOrg,
  [types.SET_ORG_USERS]: setOrgUsers,
  [types.SET_ORG_USER]: setOrgUser,
};

export default reducerFactory(actionMap, initialState);
