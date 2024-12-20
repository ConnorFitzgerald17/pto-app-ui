import { createRequest } from "./create-request";

const getOrg = () => {
  return createRequest("GET", "organization");
};

const getOrgUsers = () => {
  return createRequest("GET", "organization/users");
};

const getOrgRoles = () => {
  return createRequest("GET", "organization/roles");
};

const orgService = {
  getOrg,
  getOrgUsers,
  getOrgRoles,
};

export default orgService;
