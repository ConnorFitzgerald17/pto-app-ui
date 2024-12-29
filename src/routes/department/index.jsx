import Button from "src/components/button";
import { PlusIcon } from "@heroicons/react/24/outline";

const Department = () => {
  return (
    <>
      <div className="p-6 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Department</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage departments and their policies
            </p>
          </div>
          <Button variant="secondary">
            <div className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Create Department
            </div>
          </Button>
        </div>

        <div className="mt-4"></div>
      </div>
    </>
  );
};

export default Department;
