import { getUser } from "./get-user";
import { login } from "./login";
import { register } from "./register";
import { registerFromInvite } from "./register-invite";
import { invite } from "./invite";
import { resendInvite } from "./resend-invite";
import { deleteInvite } from "./delete-invite";
import { deleteUser } from "./delete-user";
const userThunks = {
  getUser,
  login,
  register,
  invite,
  registerFromInvite,
  resendInvite,
  deleteInvite,
  deleteUser,
};

export default userThunks;
