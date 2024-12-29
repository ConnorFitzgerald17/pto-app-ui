import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const register = createThunk({
  handler: async ({ args }) => {
    const result = await userService.register(args.data);

    const token = result.data.token;
    const details = result.data.user;
    const role = result.data.role;
    const onboardingStep = result.data.onboardingStep;
    const onboardingData = result.data.onboardingData;
    const onboardingRequired = result.data.onboardingRequired;
    return {
      token,
      details,
      role,
      onboardingStep,
      onboardingData,
      onboardingRequired,
    };
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [userActions.setUser],
  onFailure: [() => userActions.setLoading(false)],
});
