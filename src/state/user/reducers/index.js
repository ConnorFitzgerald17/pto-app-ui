import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetAuth } from "./reset-auth";
import { setLoading } from "./set-loading";
import { setUser } from "./set-user";

export const initialState = {
  isAuthenticated: false,
  isLoading: true,
  details: null,
  token: null,
};

const actionMap = {
  [types.RESET_AUTH]: resetAuth,
  [types.SET_LOADING]: setLoading,
  [types.SET_USER]: setUser,
};

export default reducerFactory(actionMap, initialState);
