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
  domain,
}) => {
  return createRequest("POST", "user/register", {
    firstName,
    lastName,
    email,
    password,
    organizationName,
    domain,
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

const invite = ({ email, role, organizationId }) => {
  return createRequest("POST", `user/invite`, {
    email,
    role,
    organizationId,
  });
};

const registerFromInvite = ({ token, password, firstName, lastName }) => {
  return createRequest("POST", `user/register-invite`, {
    token,
    password,
    firstName,
    lastName,
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
  registerFromInvite,
};

export default userService;
