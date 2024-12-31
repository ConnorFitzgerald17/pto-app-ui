import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const changeDepartments = createThunk({
  handler: async ({ args }) => {
    const result = await userService.changeDepartments(
      args.data.userIds,
      args.data.department,
    );

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});
