import orgService from "src/services/org";

import { createThunk } from "../../create-thunk";
import orgActions from "../actions";

export const updateOrgUser = createThunk({
  handler: async ({ args }) => {
    const result = await orgService.updateOrgUser(args.userId, args.data);

    const updatedOrgUser = result.data;
    return {
      updatedOrgUser,
    };
  },
  onStart: [() => orgActions.setLoading(true)],
  onSuccess: [orgActions.setOrgUser],
  onFailure: [() => orgActions.setLoading(false)],
});
