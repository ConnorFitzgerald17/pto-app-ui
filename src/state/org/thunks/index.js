import { getOrg } from "./get-org";
import { getOrgUsers } from "./get-org-users";
import { getOrgUser } from "./get-org-user";
import { updateOrgUser } from "./update-org-user";
const orgThunks = {
  getOrg,
  getOrgUsers,
  getOrgUser,
  updateOrgUser,
};

export default orgThunks;
