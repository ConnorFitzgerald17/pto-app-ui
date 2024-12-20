import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetRoles } from "./reset-roles";
import { setLoading } from "./set-roles-loading";
import { setRoles } from "./set-roles";

export const initialState = {
  isLoading: true,
  roles: null,
  dropdownRoles: [],
};

const actionMap = {
  [types.RESET_ROLES]: resetRoles,
  [types.SET_ROLES_LOADING]: setLoading,
  [types.SET_ROLES]: setRoles,
};

export default reducerFactory(actionMap, initialState);
