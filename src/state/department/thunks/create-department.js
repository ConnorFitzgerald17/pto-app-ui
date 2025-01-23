import departmentService from "src/services/department";
import { createThunk } from "../../create-thunk";
import departmentActions from "../actions";
import { getDepartment } from "./get-departments";

export const createDepartment = createThunk({
  handler: async ({ args, dispatch }) => {
    const result = await departmentService.createDepartment(args.data);
    // Refresh the departments list after creation
    await dispatch(getDepartment());
    return result.data;
  },
  onStart: [() => departmentActions.setDepartmentLoading(true)],
  onSuccess: [() => departmentActions.setDepartmentLoading(false)],
  onFailure: [() => departmentActions.setDepartmentLoading(false)],
});
