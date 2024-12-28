import { types } from "./";

export const setUser = ({
  details,
  token,
  role,
  onboardingRequired,
  onboardingStep,
  onboardingData,
}) => {
  return {
    type: types.SET_USER,
    payload: {
      details,
      token,
      role,
      onboardingRequired,
      onboardingStep,
      onboardingData,
    },
  };
};
