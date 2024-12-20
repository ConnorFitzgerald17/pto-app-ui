import { getRoles } from "./get-roles";
import { createRole } from "./create-role";
import { deleteRole } from "./delete-role";
import { getRole } from "./get-role";
import { updateRole } from "./update-role";

const rolesThunks = {
  getRoles,
  getRole,
  createRole,
  deleteRole,
  updateRole,
};

export default rolesThunks;
