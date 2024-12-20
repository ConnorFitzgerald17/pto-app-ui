import { resetAuth } from "./reset-auth";
import { setLoading } from "./set-loading";
import { setUser } from "./set-user";

export const types = Object.freeze({
  RESET_AUTH: "user::reset-auth",
  SET_LOADING: "user::set-loading",
  SET_USER: "user::set-user",
});

const userActions = {
  resetAuth,
  setLoading,
  setUser,
};

export default userActions;
