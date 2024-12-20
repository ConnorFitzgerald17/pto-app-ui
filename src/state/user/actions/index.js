import { resetAuth } from "./reset-auth";
import { setLoading } from "./set-loading";
import { setUser } from "./set-user";

export const types = Object.freeze({
  RESET_AUTH: "auth::reset-auth",
  SET_LOADING: "auth::set-loading",
  SET_USER: "auth::set-user",
});

const userActions = {
  resetAuth,
  setLoading,
  setUser,
};

export default userActions;
