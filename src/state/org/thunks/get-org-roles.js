import orgService from "src/services/org";

import { createThunk } from "../../create-thunk";
import orgActions from "../actions";

export const getOrgRoles = createThunk({
  handler: async () => {
    const result = await orgService.getOrgRoles();

    const orgRoles = result.data;
    return {
      orgRoles,
    };
  },
  onStart: [() => orgActions.setLoading(true)],
  onSuccess: [orgActions.setOrgRoles, () => orgActions.setLoading(false)],
  onFailure: [() => orgActions.setLoading(false)],
});
