import { reducerFactory } from "src/state/create-reducer-factory";

import { types } from "../actions";

import { resetDepartment } from "./reset-departments";
import { setLoading } from "./set-departments-loading";
import { setDepartment } from "./set-departments";
import { updateDepartment } from "./update-department";

export const initialState = {
  isLoading: true,
  department: null,
};

const actionMap = {
  [types.RESET_DEPARTMENT]: resetDepartment,
  [types.SET_DEPARTMENT_LOADING]: setLoading,
  [types.SET_DEPARTMENT]: setDepartment,
  [types.UPDATE_DEPARTMENT]: updateDepartment,
};

export default reducerFactory(actionMap, initialState);
