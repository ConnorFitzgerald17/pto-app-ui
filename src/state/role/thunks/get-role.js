import rolesService from "src/services/roles";

import { createThunk } from "../../create-thunk";
import rolesActions from "../actions";

export const getRole = createThunk({
  handler: async ({ args }) => {
    const result = await rolesService.getRole(args.roleId);

    const role = result.data;
    return {
      role,
    };
  },
  onStart: [() => rolesActions.setRolesLoading(true)],
  onSuccess: [rolesActions.setRole],
  onFailure: [() => rolesActions.setRolesLoading(false)],
});
