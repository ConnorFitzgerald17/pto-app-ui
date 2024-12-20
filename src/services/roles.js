import { createRequest } from "./create-request";

const getRoles = () => {
  return createRequest("GET", "organization/roles");
};

const rolesService = {
  getRoles,
};

export default rolesService;
