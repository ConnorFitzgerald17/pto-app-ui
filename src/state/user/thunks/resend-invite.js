import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const resendInvite = createThunk({
  handler: async ({ args }) => {
    const { inviteId } = args.data;
    const result = await userService.resendInvite({ inviteId });

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});
