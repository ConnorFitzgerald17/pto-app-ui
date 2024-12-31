import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const changeRoles = createThunk({
  handler: async ({ args }) => {
    const result = await userService.changeRoles(
      args.data.userIds,
      args.data.role,
    );

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});
