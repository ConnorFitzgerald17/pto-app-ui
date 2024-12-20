export const PERMISSIONS = {
  VIEW_OWN_PTO: "VIEW_OWN_PTO",
  REQUEST_PTO: "REQUEST_PTO",
  VIEW_TEAM_PTO: "VIEW_TEAM_PTO",
  MANAGE_PTO_REQUESTS: "MANAGE_PTO_REQUESTS",
  EXPORT_PTO_DATA: "EXPORT_PTO_DATA",
  VIEW_SYSTEM_LOGS: "VIEW_SYSTEM_LOGS",
  MANAGE_ORGANIZATION: "MANAGE_ORGANIZATION",
};

export const PERMISSIONS_LIST = Object.values(PERMISSIONS);

export const PERMISSION_DESCRIPTIONS = {
  VIEW_OWN_PTO: "View your own PTO balance and history",
  REQUEST_PTO: "Submit and manage your own PTO requests",
  VIEW_TEAM_PTO: "View PTO information for all team members",
  MANAGE_PTO_REQUESTS: "Approve or deny PTO requests from team members",
  EXPORT_PTO_DATA: "Download PTO reports and analytics",
  VIEW_SYSTEM_LOGS: "Access system activity and audit logs",
  MANAGE_ORGANIZATION: "Full administrative control over organization settings",
};
