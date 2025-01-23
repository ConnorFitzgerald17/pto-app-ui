import { createRequest } from "./create-request";

const getDepartments = () => {
  return createRequest("GET", `department/hierarchy`);
};

const updateDepartment = (departmentId, data) => {
  return createRequest("PUT", `department/${departmentId}`, data);
};

const createDepartment = (data) => {
  return createRequest("POST", `department`, data);
};

const departmentService = {
  getDepartments,
  updateDepartment,
  createDepartment,
};

export default departmentService;
