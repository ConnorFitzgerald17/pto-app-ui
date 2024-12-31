import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BuildingOffice2Icon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import DepartmentSelect from "src/components/department-select";
import DialogParent from "src/components/dialog";

const DepartmentChanger = ({ users = [], onChange, open, onClose }) => {
  const currentUser = useSelector((state) => state.user.details);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleChangeDepartment = () => {
    onChange(selectedDepartment);
    onClose();
  };

  return (
    <DialogParent
      icon={<BuildingOffice2Icon className="h-6 w-6" />}
      iconColor="bg-green-100"
      title="Bulk Department Update"
      description={`Update department assignments for ${
        users.length
      } selected user${
        users.length === 1 ? "" : "s"
      }. This action will transfer users to the selected department.`}
      open={open}
      onOpenChange={onClose}
    >
      <div className="py-4">
        <div className="space-y-4">
          {/* Info Banner */}
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  Selected users will be notified of their department change.
                </p>
              </div>
            </div>
          </div>

          {/* Department Selection */}
          <div>
            <DepartmentSelect
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              currentUser={currentUser}
            />
            <p className="mt-2 text-sm text-gray-500">
              Choose the department that will be assigned to all selected users.
            </p>
          </div>

          {/* Selected Users Count */}
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{users.length}</span> user
              {users.length === 1 ? "" : "s"} selected for department update
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleChangeDepartment}
            disabled={!selectedDepartment}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Department{users.length > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </DialogParent>
  );
};

export default DepartmentChanger;
