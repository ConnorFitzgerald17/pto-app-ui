import rolesService from "src/services/roles";

import { createThunk } from "../../create-thunk";
import rolesActions from "../actions";

export const deleteRole = createThunk({
  handler: async ({ args }) => {
    const result = await rolesService.deleteRole(args.data);

    const deletedRole = result.data;
    return {
      deletedRole,
    };
  },
  onStart: [() => rolesActions.setRolesLoading(true)],
  onSuccess: [() => rolesActions.setRolesLoading(false)],
  onFailure: [() => rolesActions.setRolesLoading(false)],
});
