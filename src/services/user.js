import { createRequest } from "./create-request";

const getUser = () => {
  return createRequest("GET", "/user/details");
};

const login = ({ email, password }) => {
  return createRequest("POST", "/user/login", {
    email,
    password,
  });
};

const register = ({ firstName, lastName, email, password }) => {
  return createRequest("POST", "/user/register", {
    firstName,
    lastName,
    email,
    password,
  });
};

const resendVerification = () => {
  return createRequest("GET", "/user/verify-resend");
};

const verify = (token) => {
  return createRequest("GET", `/user/verify/${token}`);
};

const requestReset = ({ email }) => {
  return createRequest("POST", `/user/reset-request`, { email });
};

const reset = ({ password, token }) => {
  return createRequest("POST", `/user/reset`, { password, token });
};

const userService = {
  getUser,
  login,
  register,
  resendVerification,
  verify,
  requestReset,
  reset,
};

export default userService;
