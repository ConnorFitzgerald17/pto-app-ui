import { createRequest } from "./create-request";

const getDepartments = () => {
  return createRequest("GET", `department/hierarchy`);
};

const updateDepartment = (departmentId, data) => {
  return createRequest("PUT", `department/${departmentId}`, data);
};

const departmentService = {
  getDepartments,
  updateDepartment,
};

export default departmentService;
