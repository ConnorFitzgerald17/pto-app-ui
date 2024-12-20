import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const deleteInvite = createThunk({
  handler: async ({ args }) => {
    const { inviteId } = args.data;
    const result = await userService.deleteInvite({ inviteId });

    return result.data;
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [() => userActions.setLoading(false)],
  onFailure: [() => userActions.setLoading(false)],
});
