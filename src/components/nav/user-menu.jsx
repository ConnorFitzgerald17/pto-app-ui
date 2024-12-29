import { Menu } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useAuth } from "src/hooks/use-auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "src/utils/local-storage";
import { localStorageKeys } from "src/constants/local-storage";
import { createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import userActions from "src/state/user/actions";

export default function UserMenu() {
  useAuth({ unauthRedirect: "/login" });
  const userDetails = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.resetAuth());
    createSuccessToast(toastMessages.LOGOUT_SUCCESSFUL);
    removeLocalStorage(localStorageKeys.AUTH_TOKEN);
    navigate("/login");
  };

  if (!userDetails) {
    return null;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 w-full">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800">
          {userDetails.firstName[0]}
        </span>
        <span className="sr-only">Your profile</span>
        <span aria-hidden="true">{userDetails.firstName}</span>
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={`block px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Your Profile
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={`block px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              onClick={handleLogout}
              className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Sign out
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
