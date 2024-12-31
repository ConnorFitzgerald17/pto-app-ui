import { getUser } from "./get-user";
import { login } from "./login";
import { register } from "./register";
import { registerFromInvite } from "./register-invite";
import { invite } from "./invite";
import { resendInvite } from "./resend-invite";
import { deleteInvite } from "./delete-invite";
import { deleteUser } from "./delete-user";
import { inviteUsers } from "./invite-users";
import { deleteUsers } from "./delete-users";
import { changeRoles } from "./change-roles";
const userThunks = {
  getUser,
  login,
  register,
  invite,
  registerFromInvite,
  resendInvite,
  deleteInvite,
  deleteUser,
  inviteUsers,
  deleteUsers,
  changeRoles,
};

export default userThunks;
