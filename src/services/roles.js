import { createRequest } from "./create-request";

const getRoles = () => {
  return createRequest("GET", "role");
};

const getRole = (roleId) => {
  return createRequest("GET", `role/${roleId}`);
};

const createRole = ({ name, description, permissions }) => {
  return createRequest("POST", "role", { name, description, permissions });
};

const updateRole = ({ name, description, permissions, isDefault }, roleId) => {
  return createRequest("PUT", `role/${roleId}`, {
    name,
    description,
    permissions,
    isDefault,
  });
};

const deleteRole = ({ id }) => {
  return createRequest("DELETE", `role`, id);
};

const rolesService = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};

export default rolesService;
