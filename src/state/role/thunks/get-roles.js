import rolesService from "src/services/roles";

import { createThunk } from "../../create-thunk";
import rolesActions from "../actions";

export const getRoles = createThunk({
  handler: async () => {
    const result = await rolesService.getRoles();

    const roles = result.data;
    return {
      roles,
    };
  },
  onStart: [() => rolesActions.setRolesLoading(true)],
  onSuccess: [rolesActions.setRoles],
  onFailure: [() => rolesActions.setRolesLoading(false)],
});
