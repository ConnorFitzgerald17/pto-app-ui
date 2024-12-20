import rolesService from "src/services/roles";

import { createThunk } from "../../create-thunk";
import rolesActions from "../actions";

export const createRole = createThunk({
  handler: async ({ args }) => {
    console.log(args);
    const result = await rolesService.createRole(args.data);

    const newRole = result.data;
    return {
      newRole,
    };
  },
  onStart: [() => rolesActions.setRolesLoading(true)],
  onSuccess: [() => rolesActions.setRolesLoading(false)],
  onFailure: [() => rolesActions.setRolesLoading(false)],
});
