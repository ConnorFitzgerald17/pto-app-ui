import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const registerFromInvite = createThunk({
  handler: async ({ args }) => {
    const result = await userService.registerFromInvite(args.data);

    const token = result.data.token;
    const details = result.data.user;
    const role = result.data.role;
    return {
      token,
      details,
      role,
    };
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [userActions.setUser],
  onFailure: [() => userActions.setLoading(false)],
});
