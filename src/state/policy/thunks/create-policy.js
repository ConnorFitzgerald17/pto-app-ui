import policyService from "src/services/policy";

import { createThunk } from "../../create-thunk";
import policyActions from "../actions";

export const createPolicy = createThunk({
  handler: async ({ args }) => {
    await policyService.createPolicy(args.data);

    return {
      policy: args.data,
    };
  },
  onStart: [() => policyActions.setPolicyLoading(true)],
  onSuccess: [() => policyActions.setPolicyLoading(false)],
  onFailure: [() => policyActions.setPolicyLoading(false)],
});
