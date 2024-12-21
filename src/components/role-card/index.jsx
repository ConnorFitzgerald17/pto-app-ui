import { useState } from "react";
import { useSelector } from "react-redux";
import { PERMISSION_DESCRIPTIONS } from "../../constants/permissions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DeleteConfirmDialog from "src/components/delete-confirm";
import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";
import rolesThunks from "src/state/role/thunks";
import { useDispatch } from "react-redux";

import EditRole from "src/components/edit-role";

const RoleCard = ({ role, handleFetch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const currentUser = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const handleDeleteRole = () => {
    try {
      dispatch(
        rolesThunks.deleteRole(
          { data: { id: role.roleId } },
          (err) => {
            if (!err) {
              createSuccessToast(toastMessages.ROLE_DELETE_SUCCESSFUL);
              handleFetch();
              return;
            }
            const errorMessage = decodeAPIMessage(
              get(err, "response.data.error", ""),
            );
            createErrorToast(
              errorMessage ? errorMessage : toastMessages.ROLE_DELETE_ERROR,
            );
          },
          false,
        ),
      );
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleCloseEditRole = () => {
    setIsOpen(false);
    setRoleId(null);
    handleFetch();
  };

  return (
    <>
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => handleDeleteRole()}
        title="Delete Role"
        message="Are you sure you want to delete this role? All users with this role will be reassigned to your organization's default role. This action cannot be undone."
      />
      {roleId && (
        <EditRole
          isOpen={isOpen}
          onClose={handleCloseEditRole}
          roleId={roleId}
        />
      )}

      <div className="rounded-md border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              {role.name}
              {role.isDefault && (
                <span className="text-xs font-medium bg-green-100 text-green-800 rounded-md px-1.5 py-0.5 ml-1">
                  Default
                </span>
              )}
              {currentUser.role.roleId === role.roleId && (
                <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-md px-1.5 py-0.5 ml-1">
                  Current
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setRoleId(role.roleId);
                  setIsOpen(true);
                }}
                className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              {currentUser.role.roleId !== role.roleId && (
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">{role.description}</p>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-medium text-gray-600">Permissions</h4>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? "− Less" : "+ More"}
              </button>
            </div>

            {isExpanded ? (
              <div className="mt-2 space-y-1.5">
                {role.permissions.map((permission) => (
                  <div
                    key={permission}
                    className="rounded bg-gray-50 px-3 py-2"
                  >
                    <div className="text-xs font-medium text-gray-700">
                      {permission}
                    </div>
                    {PERMISSION_DESCRIPTIONS[permission] && (
                      <div className="mt-0.5 text-xs text-gray-500">
                        {PERMISSION_DESCRIPTIONS[permission]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleCard;
