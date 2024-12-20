import orgService from "src/services/org";

import { createThunk } from "../../create-thunk";
import orgActions from "../actions";

export const getOrg = createThunk({
  handler: async () => {
    const result = await orgService.getOrg();

    const org = result.data.org;
    return {
      org,
    };
  },
  onStart: [() => orgActions.setLoading(true)],
  onSuccess: [orgActions.setOrg],
  onFailure: [() => orgActions.setLoading(false)],
});
