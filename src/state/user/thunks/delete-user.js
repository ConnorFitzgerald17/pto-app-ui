import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const deleteUser = createThunk({
  handler: async ({ args }) => {
    const result = await userService.deleteUser(args.data);

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});
