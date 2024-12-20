export const errorMap = {
  "user.login.failed": "Incorrect username or password",
  "user.register.email.in.use": "An account with that email already exists",
  "user.reset.token.invalid":
    "Password reset token is either invalid or has expired",
  "role.create.failed": "Failed to create role",
  "role.create.duplicate.name": "A role with that name already exists",
  "role.create.name.required": "Name is required",
  "role.create.description.required": "Description is required",
  "role.create.permissions.required": "At least one permission is required",
  "role.delete.default": "Cannot delete default role",
  "role.update.remove.default":
    "Cannot remove default status from current default role",
};

export const decodeAPIMessage = (message) => {
  return errorMap[message] || "An unknown error has occured";
};
