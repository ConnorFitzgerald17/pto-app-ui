import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import orgThunks from "src/state/org/thunks";
import rolesThunks from "src/state/role/thunks";
import policyThunks from "src/state/policy/thunks";

import LoadingSpinner from "src/components/loading-spinner";
import RoleManagement from "src/components/role-table";
import CreateRoleModal from "src/components/create-role";

import { PERMISSIONS } from "src/constants/permissions";

export default function OrganizationDashboard() {
  const roles = useSelector((state) => state.roles.roles);
  const orgLoading = useSelector((state) => state.org.isLoading);
  const dispatch = useDispatch();
  const currentUserPermissions = useSelector(
    (state) => state.user.details?.role?.permissions || [],
  );

  useEffect(() => {
    dispatch(orgThunks.getOrgUsers({}));
    dispatch(rolesThunks.getRoles({}));
    dispatch(policyThunks.getPolicy({}));
  }, [dispatch]);

  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);

  if (orgLoading) {
    return <LoadingSpinner />;
  }

  const handleFetchRoles = () => {
    dispatch(rolesThunks.getRoles({}));
  };

  const handleFetchRolesAndUsers = () => {
    dispatch(rolesThunks.getRoles({}));
    dispatch(orgThunks.getOrgUsers({}));
  };

  return (
    <div className="min-h-screen p-6 mt-12">
      {/* Create Role Modal */}
      <CreateRoleModal
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
        fetchRoles={handleFetchRoles}
      />

      {/* Content based on active tab */}
      <div className="space-y-8">
        {/* Keeping permissions for future use */}
        {currentUserPermissions.includes(PERMISSIONS.MANAGE_ORGANIZATION) && (
          <RoleManagement
            roles={roles}
            onCreateRoleClick={() => setIsCreateRoleModalOpen(true)}
            handleFetch={handleFetchRolesAndUsers}
          />
        )}
      </div>
    </div>
  );
}
