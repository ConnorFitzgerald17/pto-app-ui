import orgService from "src/services/org";

import { createThunk } from "../../create-thunk";
import orgActions from "../actions";

export const getOrgUser = createThunk({
  handler: async ({ args }) => {
    const result = await orgService.getOrgUser(args.data.userId);

    const orgUser = result.data;
    return {
      orgUser,
    };
  },
  onStart: [() => orgActions.setLoading(true)],
  onSuccess: [orgActions.setOrgUser],
  onFailure: [() => orgActions.setLoading(false)],
});
