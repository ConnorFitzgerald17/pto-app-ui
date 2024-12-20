import { getUser } from "./get-user";
import { login } from "./login";
import { register } from "./register";
import { registerFromInvite } from "./register-invite";
import { invite } from "./invite";
const userThunks = {
  getUser,
  login,
  register,
  invite,
  registerFromInvite,
};

export default userThunks;
