import { PERMISSIONS } from "src/constants/permissions";

export const navigation = [
  { name: "Dashboard", href: "/", current: false, permissions: [] },
  { name: "Calendar", href: "/calendar", current: false, permissions: [] },
  {
    name: "Organization",
    href: "/organization",
    current: false,
    permissions: [PERMISSIONS.MANAGE_ORGANIZATION],
  },
  { name: "History", href: "/history", current: false, permissions: [] },
];
