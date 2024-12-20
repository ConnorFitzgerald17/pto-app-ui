export const errorMap = {
  "user.login.failed": "Incorrect username or password",
  "user.register.email.in.use": "An account with that email already exists",
  "user.reset.token.invalid":
    "Password reset token is either invalid or has expired",
};

export const decodeAPIMessage = (message) => {
  return errorMap[message] || "An unknown error has occured";
};
