import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const deleteUsers = createThunk({
  handler: async ({ args }) => {
    const result = await userService.deleteUsers(args.data.userIds);

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});