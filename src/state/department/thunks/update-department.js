import departmentService from "src/services/department";
import { createThunk } from "../../create-thunk";
import departmentActions from "../actions";

export const updateDepartment = createThunk({
  handler: async ({ args }) => {
    const { departmentId, data } = args;
    const result = await departmentService.updateDepartment(departmentId, data);
    return result.data;
  },
  onStart: [() => departmentActions.setDepartmentLoading(true)],
  onSuccess: [
    (result) => departmentActions.updateDepartment(result),
    () => departmentActions.setDepartmentLoading(false),
  ],
  onFailure: [() => departmentActions.setDepartmentLoading(false)],
});
