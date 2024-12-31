export const errorMap = {
  "user.login.failed": "Incorrect username or password",
  "user.register.email.in.use": "An account with that email already exists",
  "user.reset.token.invalid":
    "Password reset token is either invalid or has expired",
  "user.invite.email.in.use": "An account with that email already exists",
  "role.create.failed": "Failed to create role",
  "role.create.duplicate.name": "A role with that name already exists",
  "role.create.name.required": "Name is required",
  "role.create.description.required": "Description is required",
  "role.create.permissions.required": "At least one permission is required",
  "role.delete.default": "Cannot delete default role",
  "role.update.remove.default":
    "Cannot remove default status from current default role",
  "role.delete.users.or.invites": "Cannot delete role with users or invites",

  "user.change.departments.department.same.as.current":
    "Department is the same as the current department",
  "user.change.roles.role.same.as.current":
    "Role is the same as the current role",
  "user.change.departments.no.users.provided": "No users provided",
  "user.change.roles.no.users.provided": "No users provided",
  "user.change.departments.department.not.found": "Department not found",
  "user.change.roles.role.not.found": "Role not found",
};

export const decodeAPIMessage = (message) => {
  return errorMap[message] || "An unknown error has occured";
};
