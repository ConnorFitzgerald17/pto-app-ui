import departmentService from "src/services/department";

import { createThunk } from "../../create-thunk";
import departmentActions from "../actions";

export const createDepartment = createThunk({
  handler: async ({ args }) => {
    await departmentService.createDepartment(args.data);

    return {
      department: args.data,
    };
  },
  onStart: [() => departmentActions.setDepartmentLoading(true)],
  onSuccess: [() => departmentActions.setDepartmentLoading(false)],
  onFailure: [() => departmentActions.setDepartmentLoading(false)],
});
