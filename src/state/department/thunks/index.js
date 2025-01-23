import { getDepartment } from "./get-departments";
import { createDepartment } from "./create-department";
import { updateDepartment } from "./update-department";
const departmentThunks = {
  getDepartment,
  createDepartment,
  updateDepartment,
};

export default departmentThunks;
