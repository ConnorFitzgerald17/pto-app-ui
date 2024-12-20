import policyService from "src/services/policy";

import { createThunk } from "../../create-thunk";
import policyActions from "../actions";

export const getPolicy = createThunk({
  handler: async () => {
    const result = await policyService.getPolicies();

    const policy = result.data;
    return {
      policy,
    };
  },
  onStart: [() => policyActions.setPolicyLoading(true)],
  onSuccess: [policyActions.setPolicy],
  onFailure: [() => policyActions.setPolicyLoading(false)],
});
