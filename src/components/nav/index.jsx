import { Disclosure } from "@headlessui/react";
import MobileMenuButton from "./mobile-button";
import DesktopNavigation from "./desktop-nav";
import MobileNavigation from "./mobile-nav";
import UserActions from "./user-actions";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MobileMenuButton open={open} />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <DesktopNavigation />
              </div>
              <UserActions />
            </div>
          </div>
          <MobileNavigation />
        </>
      )}
    </Disclosure>
  );
}
