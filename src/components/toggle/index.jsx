import { Switch } from "@headlessui/react";
import React from "react";

const Toggle = ({ checked = false, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-indigo-500" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable</span>
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default Toggle;
