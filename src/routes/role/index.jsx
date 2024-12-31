import { Button } from "src/components/ui/button";
import { PlusIcon } from "lucide-react";

const Role = () => {
  return (
    <div className="p-6 mt-2">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles (TODO)</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage roles and their permissions
          </p>
        </div>
        <Button variant="primary">
          <div className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create Role
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Role;
