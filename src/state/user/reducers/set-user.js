export const setUser = ({ state, action }) => {
  return {
    ...state,
    isAuthenticated: true,
    isLoading: false,
    token: action.payload.token,
    details: action.payload.details,
    role: action.payload.role,
    onboardingRequired: action.payload.onboardingRequired,
    onboardingStep: action.payload.onboardingStep,
    onboardingData: action.payload.onboardingData,  
  };
};
