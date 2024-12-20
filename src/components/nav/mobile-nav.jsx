import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "./nav-items";
import { classNames } from "src/utils/class-names";

export default function MobileNavigation() {
  const location = useLocation();

  const isCurrentPath = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as={Link}
            to={item.href}
            className={classNames(
              isCurrentPath(item.href)
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium",
            )}
            aria-current={isCurrentPath(item.href) ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
}
