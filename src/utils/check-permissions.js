export const checkPermissions = (permissions, requiredPermissions) => {
  return permissions.some((permission) =>
    requiredPermissions.includes(permission),
  );
};
