import orgService from "src/services/org";

import { createThunk } from "../../create-thunk";
import orgActions from "../actions";

export const getOrgUsers = createThunk({
  handler: async () => {
    const result = await orgService.getOrgUsers();

    const orgUsers = result.data;
    return {
      orgUsers,
    };
  },
  onStart: [() => orgActions.setLoading(true)],
  onSuccess: [orgActions.setOrgUsers, () => orgActions.setLoading(false)],
  onFailure: [() => orgActions.setLoading(false)],
});
