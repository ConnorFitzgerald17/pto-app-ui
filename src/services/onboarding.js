import { createRequest } from "./create-request";

const getOnboardingState = (userId, orgId) => {
  return createRequest("GET", `onboarding/${userId}/${orgId}`);
};

const updateOnboardingState = (currentStep, data) => {
  return createRequest("POST", `onboarding/${currentStep}`, data);
};

const onboardingService = {
  getOnboardingState,
  updateOnboardingState,
};

export default onboardingService;
