import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const invite = createThunk({
  handler: async ({ args }) => {
    console.log("invite", args);

    const result = await userService.invite(args.data);

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});
