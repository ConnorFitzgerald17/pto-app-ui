import { createRequest } from "./create-request";

const getOrg = () => {
  return createRequest("GET", "organization");
};

const getOrgUsers = () => {
  return createRequest("GET", "organization/users");
};

const getOrgUser = (userId) => {
  return createRequest("GET", `organization/users/${userId}`);
};

const updateOrgUser = (userId, data) => {
  return createRequest("PUT", `organization/users/${userId}`, data);
};

const getOrgRoles = () => {
  return createRequest("GET", "organization/roles");
};

const orgService = {
  getOrg,
  getOrgUsers,
  getOrgUser,
  getOrgRoles,
  updateOrgUser,
};

export default orgService;
