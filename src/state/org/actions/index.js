import { resetOrg } from "./reset-org";
import { setLoading } from "./set-org-loading";
import { setOrg } from "./set-org";
import { setOrgUsers } from "./set-org-users";
export const types = Object.freeze({
  SET_ORG: "org::set-org",
  SET_ORG_USERS: "org::set-org-users",
  SET_ORG_LOADING: "org::set-org-loading",
  RESET_ORG: "org::reset-org",
});

const orgActions = {
  resetOrg,
  setLoading,
  setOrg,
  setOrgUsers,
};

export default orgActions;
