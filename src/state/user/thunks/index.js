import { getUser } from "./get-user";
import { login } from "./login";
import { register } from "./register";

const userThunks = {
  getUser,
  login,
  register,
};

export default userThunks;
