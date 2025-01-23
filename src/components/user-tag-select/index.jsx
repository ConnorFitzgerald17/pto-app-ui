import { useState, useRef, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

const UserTagSelect = ({
  users = [],
  selectedUsers = [],
  onChange,
  disabled = false,
  placeholder = "Search users...",
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
    <div className="relative" ref={dropdownRef}>
      <div className="min-h-[42px] w-full rounded-md border border-gray-300 bg-white px-2 py-1 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <div className="flex flex-wrap gap-1">
          {selectedUsers.map((userId) => {
            const user = users.find((u) => u.userId === userId);
            return (
              <span
                key={userId}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm"
              >
                <UserCircleIcon className="mr-1 h-5 w-5 text-indigo-400" />
                {user.firstName} {user.lastName}
                <button
                  onClick={() => handleRemoveUser(userId)}
                  disabled={disabled}
                  className="ml-1 text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            );
          })}
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border-none p-1 text-sm focus:outline-none focus:ring-0"
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
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredUsers.map((user) => (
            <button
              key={user.userId}
              onClick={() => handleAddUser(user.userId)}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-50"
            >
              <UserCircleIcon className="mr-2 h-5 w-5 text-gray-400" />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTagSelect;
