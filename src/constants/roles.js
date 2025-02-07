export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: [
    "MANAGE_ORGANIZATION",
    "MANAGE_USERS",
    "MANAGE_ROLES",
    "MANAGE_POLICIES",
    "VIEW_REPORTS",
    "MANAGE_DEPARTMENTS",
    "MANAGE_TEAMS",
    "APPROVE_ALL_LEAVE",
  ],
  HR_ADMIN: [
    "MANAGE_USERS",
    "MANAGE_POLICIES",
    "VIEW_REPORTS",
    "MANAGE_DEPARTMENTS",
    "MANAGE_TEAMS",
    "APPROVE_DEPARTMENT_LEAVE",
  ],
  DEPARTMENT_HEAD: [
    "MANAGE_DEPARTMENT_USERS",
    "VIEW_DEPARTMENT_REPORTS",
    "MANAGE_TEAMS",
    "APPROVE_DEPARTMENT_LEAVE",
  ],
  EMPLOYEE: ["VIEW_SELF", "REQUEST_LEAVE", "VIEW_TEAM_CALENDAR"],
};

export const ROLE_LEVELS = {
  SUPER_ADMIN: 4,
  HR_ADMIN: 3,
  DEPARTMENT_HEAD: 2,
  EMPLOYEE: 1,
};

export const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  HR_ADMIN: "HR Admin",
  DEPARTMENT_HEAD: "Department Head",
  EMPLOYEE: "Employee",
};
