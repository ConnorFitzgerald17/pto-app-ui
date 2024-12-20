import { Link, useLocation } from "react-router-dom";
import { navigation } from "./nav-items";
import { classNames } from "src/utils/class-names";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function DesktopNavigation() {
  const location = useLocation();
  const userDetails = useSelector((state) => state.user.details);
  const [filteredNavigation, setFilteredNavigation] = useState(navigation);
  const isCurrentPath = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    if (userDetails?.role?.permissions) {
      setFilteredNavigation(
        navigation.filter(
          (item) =>
            !item.permissions.length || // Ignore items with no required permissions
            userDetails?.role?.permissions?.some(
              (permission) => item.permissions.includes(permission), // Keep items the user has permission for
            ),
        ),
      );
    }
  }, [userDetails]);

  if (!userDetails) {
    return null;
  }

  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {filteredNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              isCurrentPath(item.href)
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium",
            )}
            aria-current={isCurrentPath(item.href) ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
