import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetPolicy } from "./reset-policy";
import { setLoading } from "./set-policy-loading";
import { setPolicy } from "./set-policy";

export const initialState = {
  isLoading: true,
  policy: null,
};

const actionMap = {
  [types.RESET_POLICY]: resetPolicy,
  [types.SET_POLICY_LOADING]: setLoading,
  [types.SET_POLICY]: setPolicy,
};

export default reducerFactory(actionMap, initialState);
