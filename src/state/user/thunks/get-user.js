import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const getUser = createThunk({
  handler: async () => {
    const result = await userService.getUser();

    const token = result.data.token;
    const details = result.data.user;

    return {
      token,
      details,
    };
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [userActions.setUser],
  onFailure: [() => userActions.setLoading(false)],
});
