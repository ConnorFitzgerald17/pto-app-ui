import userService from "src/services/user";

import { createThunk } from "../../create-thunk";
import userActions from "../actions";

export const login = createThunk({
  handler: async ({ args }) => {
    const result = await userService.login(args.data);

    const token = result.data.token;
    const details = result.data.user;
    const role = result.data.role;
    const onboardingRequired = result.data.onboardingRequired;
    const onboardingStep = result.data.onboardingStep;
    const onboardingData = result.data.onboardingData;
    return {
      token,
      details,
      role,
      onboardingRequired,
      onboardingStep,
      onboardingData,
    };
  },
  onStart: [() => userActions.setLoading(true)],
  onSuccess: [userActions.setUser],
  onFailure: [() => userActions.setLoading(false)],
});
