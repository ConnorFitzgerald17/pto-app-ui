import rolesService from "src/services/roles";

import { createThunk } from "../../create-thunk";
import rolesActions from "../actions";

export const updateRole = createThunk({
  handler: async ({ args }) => {
    const result = await rolesService.updateRole(args.data, args.roleId);

    const updatedRole = result.data;
    return {
      updatedRole,
    };
  },
  onStart: [() => rolesActions.setRolesLoading(true)],
  onSuccess: [() => rolesActions.setRolesLoading(false)],
  onFailure: [() => rolesActions.setRolesLoading(false)],
});
