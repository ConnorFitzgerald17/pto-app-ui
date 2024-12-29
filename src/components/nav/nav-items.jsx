import {
  HomeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentIcon,
  UsersIcon,
  CogIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { PERMISSIONS_NEW } from "src/constants/permissions";

export const navigation = [
  // Default Section
  { name: "Dashboard", href: "/", icon: HomeIcon, permissions: [] },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon, permissions: [] },

  // Admin Section
  {
    name: "Organization",
    href: "/organization",
    icon: BriefcaseIcon,
    permissions: [PERMISSIONS_NEW.MANAGE_ORGANIZATION],
    section: "Admin",
  },
  {
    name: "User",
    href: "/user",
    icon: UsersIcon,
    permissions: [
      PERMISSIONS_NEW.MANAGE_USERS,
      PERMISSIONS_NEW.MANAGE_ROLES,
      PERMISSIONS_NEW.INVITE_USERS,
    ],
    section: "Admin",
  },
  {
    name: "Policy",
    href: "/policy",
    icon: DocumentIcon,
    permissions: [
      PERMISSIONS_NEW.MANAGE_POLICIES,
      PERMISSIONS_NEW.VIEW_ALL_POLICIES,
      PERMISSIONS_NEW.MANAGE_DEPARTMENT_POLICIES,
    ],
    section: "Admin",
  },
  {
    name: "Department",
    href: "/department",
    icon: BuildingOfficeIcon,
    permissions: [
      PERMISSIONS_NEW.MANAGE_DEPARTMENTS,
      PERMISSIONS_NEW.VIEW_DEPARTMENT,
    ],
    section: "Admin",
  },

  // Reports Section
  {
    name: "Reports",
    href: "/reports",
    icon: ChartBarIcon,
    permissions: [PERMISSIONS_NEW.VIEW_REPORTS],
    section: "Reports", // Changed section name for clarity
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartBarIcon,
    permissions: [PERMISSIONS_NEW.VIEW_ANALYTICS],
    section: "Reports", // Changed section name for clarity
  },
  {
    name: "Export",
    href: "/export",
    icon: ChartBarIcon,
    permissions: [PERMISSIONS_NEW.EXPORT_PTO_DATA],
    section: "Reports", // Changed section name for clarity
  },

  // System Section
  {
    name: "System",
    href: "/system",
    icon: CogIcon,
    permissions: [PERMISSIONS_NEW.VIEW_SYSTEM_LOGS],
    section: "System",
  },
];
