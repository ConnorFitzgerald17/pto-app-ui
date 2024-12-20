import { resetRoles } from "./reset-roles";
import { setRolesLoading } from "./set-roles-loading";
import { setRoles } from "./set-roles";
export const types = Object.freeze({
  SET_ROLES_LOADING: "role::set-roles-loading",
  SET_ROLES: "role::set-roles",
  RESET_ROLES: "role::reset-roles",
});

const roleActions = {
  resetRoles,
  setRolesLoading,
  setRoles,
};

export default roleActions;
