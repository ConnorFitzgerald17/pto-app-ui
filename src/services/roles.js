import { createRequest } from "./create-request";

const getRoles = () => {
  return createRequest("GET", "role");
};

const createRole = ({ name, description, permissions }) => {
  return createRequest("POST", "role", { name, description, permissions });
};

const rolesService = {
  getRoles,
  createRole,
};

export default rolesService;
