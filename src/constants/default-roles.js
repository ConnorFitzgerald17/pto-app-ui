import { PERMISSIONS } from "./permissions";
export const DEFAULT_ROLES = [
  {
    name: "EMPLOYEE",
    permissions: [PERMISSIONS.VIEW_OWN_PTO, PERMISSIONS.REQUEST_PTO],
    description: "Regular employee with basic PTO management capabilities",
  },
  {
    name: "MANAGER",
    permissions: [
      PERMISSIONS.VIEW_OWN_PTO,
      PERMISSIONS.REQUEST_PTO,
      PERMISSIONS.VIEW_TEAM_PTO,
      PERMISSIONS.MANAGE_PTO_REQUESTS,
    ],
    description: "Team manager with PTO approval capabilities",
  },
  {
    name: "ADMIN",
    permissions: [
      PERMISSIONS.VIEW_OWN_PTO,
      PERMISSIONS.REQUEST_PTO,
      PERMISSIONS.VIEW_TEAM_PTO,
      PERMISSIONS.MANAGE_PTO_REQUESTS,
      PERMISSIONS.EXPORT_PTO_DATA,
      PERMISSIONS.VIEW_SYSTEM_LOGS,
      PERMISSIONS.MANAGE_ORGANIZATION,
    ],
    description: "Organization administrator with full access",
  },
];
