import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePolicyModal from "src/components/create-policy";
import Button from "src/components/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import PolicyOverview from "src/components/policy-overview";
import policyThunks from "src/state/policy/thunks";
import LoadingSpinner from "src/components/loading-spinner";

const Policy = () => {
  const [isCreatePolicyModalOpen, setIsCreatePolicyModalOpen] = useState(false);
  const policy = useSelector((state) => state.policy.policy);
  const policyLoading = useSelector((state) => state.policy.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(policyThunks.getPolicy({}));
  }, [dispatch]);

  if (policyLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 mt-2">
      <>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Policy</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage leave policies and their rules
            </p>
          </div>

          <Button
            onClick={() => setIsCreatePolicyModalOpen(true)}
            variant="secondary"
          >
            <div className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Create Policy
            </div>
          </Button>
          <CreatePolicyModal
            isOpen={isCreatePolicyModalOpen}
            onClose={() => setIsCreatePolicyModalOpen(false)}
          />
        </div>
        <div className="space-y-4 mt-4">
          {policy &&
            policy.map((p) => <PolicyOverview key={p.policyId} policy={p} />)}
        </div>
      </>
    </div>
  );
};

export default Policy;
