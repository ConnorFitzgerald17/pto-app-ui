import { useState, useRef, useEffect } from "react";
import {
  UserCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const UserTagSelect = ({
  users = [],
  selectedUsers = [],
  onChange,
  disabled = false,
  placeholder = "Search users...",
  currentDepartmentId,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      !selectedUsers.includes(user.userId) &&
      (
        user.firstName.toLowerCase() +
        " " +
        user.lastName.toLowerCase()
      ).includes(searchQuery.toLowerCase()),
  );

  const handleRemoveUser = (userId) => {
    onChange(selectedUsers.filter((id) => id !== userId));
  };

  const handleAddUser = (userId) => {
    onChange([...selectedUsers, userId]);
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="min-h-[42px] w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {selectedUsers.map((userId) => {
            const user = users.find((u) => u.userId === userId);
            const isDifferentDepartment =
              user?.departmentId && user.departmentId !== currentDepartmentId;

            return (
              <div
                key={userId}
                className="group relative inline-block max-w-[calc(100%-8px)] sm:max-w-fit"
              >
                <span
                  className={`
                    inline-flex w-full items-center justify-between gap-x-1 rounded-md px-1.5 py-1 text-xs sm:px-2
                    ${
                      isDifferentDepartment
                        ? "bg-yellow-50 ring-1 ring-yellow-200"
                        : "bg-indigo-50"
                    }
                  `}
                >
                  <div className="flex min-w-0 items-center">
                    <UserCircleIcon className="h-3.5 w-3.5 flex-shrink-0 text-indigo-400 sm:h-4 sm:w-4" />
                    <div className="ml-1 flex min-w-0 flex-col leading-none">
                      <span className="truncate text-xs">
                        {user.firstName} {user.lastName}
                      </span>
                      <span
                        className={`truncate text-[10px] ${
                          isDifferentDepartment
                            ? "text-yellow-700"
                            : "text-gray-500"
                        }`}
                      >
                        {user.department || "No Department"}
                        {isDifferentDepartment && (
                          <ArrowRightIcon className="ml-1 inline h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        )}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveUser(userId)}
                    disabled={disabled}
                    className="ml-1 flex-shrink-0 text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    <XMarkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </span>

                {isDifferentDepartment && (
                  <div className="absolute left-0 -top-16 hidden w-max max-w-[200px] sm:-top-12 sm:max-w-none group-hover:block z-10">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-1.5 sm:p-2 text-[10px] sm:text-xs text-yellow-700 shadow-lg whitespace-normal sm:whitespace-nowrap">
                      <ExclamationTriangleIcon className="inline h-2.5 w-2.5 mr-1 sm:h-3 sm:w-3" />
                      Will be transferred to current department
                    </div>
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-yellow-50 border-r border-b border-yellow-200 transform rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}

          <input
            ref={inputRef}
            type="text"
            className="flex-1 min-w-[120px] border-none p-1 text-xs sm:text-sm focus:outline-none focus:ring-0"
            placeholder={selectedUsers.length === 0 ? placeholder : ""}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
            disabled={disabled}
          />
        </div>
      </div>

      {isSearching && filteredUsers.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-48 sm:max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredUsers.map((user) => (
            <button
              key={user.userId}
              onClick={() => handleAddUser(user.userId)}
              className="flex w-full items-center px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-900 hover:bg-gray-50 cursor-pointer"
            >
              <UserCircleIcon className="mr-1.5 h-3 w-3 text-gray-400 sm:mr-2 sm:h-3.5 sm:w-3.5" />
              <div className="flex min-w-0 items-center">
                <span className="truncate">
                  {user.firstName} {user.lastName} -{" "}
                  {user.department ? user.department : "No Department"}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTagSelect;
