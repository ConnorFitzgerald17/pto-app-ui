import departmentService from "src/services/department";

import { createThunk } from "../../create-thunk";
import departmentActions from "../actions";

export const getDepartment = createThunk({
  handler: async () => {
    const result = await departmentService.getDepartments();

    const department = result.data;
    return {
      department: department.hierarchy,
      totalDepartmentCount: department?.totalDepartmentCount || 0,
    };
  },
  onStart: [() => departmentActions.setDepartmentLoading(true)],
  onSuccess: [departmentActions.setDepartment],
  onFailure: [() => departmentActions.setDepartmentLoading(false)],
});
