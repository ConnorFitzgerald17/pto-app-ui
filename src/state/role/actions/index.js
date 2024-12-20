import { resetRoles } from "./reset-roles";
import { setRolesLoading } from "./set-roles-loading";
import { setRoles } from "./set-roles";
import { setRole } from "./set-role";
export const types = Object.freeze({
  SET_ROLES_LOADING: "role::set-roles-loading",
  SET_ROLES: "role::set-roles",
  SET_ROLE: "role::set-role",
  RESET_ROLES: "role::reset-roles",
});

const roleActions = {
  resetRoles,
  setRolesLoading,
  setRoles,
  setRole,
};

export default roleActions;
