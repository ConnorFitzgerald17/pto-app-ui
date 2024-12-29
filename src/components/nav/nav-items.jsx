import {
  HomeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { PERMISSIONS } from "src/constants/permissions";

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, permissions: [] },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon, permissions: [] },
  {
    name: "Organization",
    href: "/organization",
    icon: BuildingOfficeIcon,
    permissions: [PERMISSIONS.MANAGE_ORGANIZATION],
  },
  { name: "History", href: "/history", icon: ClockIcon, permissions: [] },
];
