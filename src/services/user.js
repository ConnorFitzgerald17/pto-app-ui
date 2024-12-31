import { createRequest } from "./create-request";

const getUser = () => {
  return createRequest("GET", "user/details");
};

const login = ({ email, password }) => {
  return createRequest("POST", "user/login", {
    email,
    password,
  });
};

const register = ({
  firstName,
  lastName,
  email,
  password,
  organizationName,
}) => {
  return createRequest("POST", "user/register", {
    firstName,
    lastName,
    email,
    password,
    organizationName,
  });
};

const resendVerification = () => {
  return createRequest("GET", "user/verify-resend");
};

const verify = (token) => {
  return createRequest("GET", `user/verify/${token}`);
};

const requestReset = ({ email }) => {
  return createRequest("POST", `user/reset-request`, { email });
};

const reset = ({ password, token }) => {
  return createRequest("POST", `user/reset`, { password, token });
};

const invite = ({ email, role, organizationId, policyIds }) => {
  return createRequest("POST", `user/invite`, {
    email,
    role,
    organizationId,
    policyIds,
  });
};

const inviteUsers = ({ users }) => {
  return createRequest("POST", `user/invite/bulk`, {
    users,
  });
};

const resendInvite = ({ inviteId }) => {
  return createRequest("POST", `user/invite/resend`, {
    inviteId,
  });
};

const deleteInvite = ({ inviteId }) => {
  return createRequest("DELETE", `user/invite`, inviteId);
};

const deleteUser = ({ userId }) => {
  return createRequest("DELETE", `user/delete`, userId);
};

const deleteUsers = (userIds) => {
  return createRequest("DELETE_BULK", `user/delete/bulk`, { userIds });
};

const registerFromInvite = ({ token, password, firstName, lastName }) => {
  return createRequest("POST", `user/register-invite`, {
    token,
    password,
    firstName,
    lastName,
  });
};

const changeRoles = (userIds, role) => {
  return createRequest("PUT", `user/change-roles`, {
    userIds,
    role,
  });
};

const userService = {
  getUser,
  login,
  register,
  resendVerification,
  verify,
  requestReset,
  reset,
  invite,
  inviteUsers,
  registerFromInvite,
  resendInvite,
  deleteInvite,
  deleteUser,
  deleteUsers,
  changeRoles,
};

export default userService;
