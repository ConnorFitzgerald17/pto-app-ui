import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetRoles } from "./reset-roles";
import { setLoading } from "./set-roles-loading";
import { setRoles } from "./set-roles";
import { setRole } from "./set-role";
export const initialState = {
  isLoading: true,
  roles: null,
  role: null,
  dropdownRoles: [],
};

const actionMap = {
  [types.RESET_ROLES]: resetRoles,
  [types.SET_ROLES_LOADING]: setLoading,
  [types.SET_ROLES]: setRoles,
  [types.SET_ROLE]: setRole,
};

export default reducerFactory(actionMap, initialState);
