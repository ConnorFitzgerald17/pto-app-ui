import { resetDepartment } from "./reset-departments";
import { setDepartmentLoading } from "./set-departments-loading";
import { setDepartment } from "./set-departments";

export const types = Object.freeze({
  SET_DEPARTMENT_LOADING: "department::set-department-loading",
  SET_DEPARTMENT: "department::set-department",
  UPDATE_DEPARTMENT: "department::update-department",
  RESET_DEPARTMENT: "department::reset-department",
});

const departmentActions = {
  resetDepartment,
  setDepartmentLoading,
  setDepartment,
};

export default departmentActions;
