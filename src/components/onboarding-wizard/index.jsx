import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createErrorToast } from "src/utils/create-toast";
import onboardingService from "src/services/onboarding";
import BasicInfo from "./steps/basic-info";
import QuickSetup from "./steps/quick-setup";
import TeamStructure from "./steps/team-structure";

const steps = [
  {
    id: 0,
    title: "Basic Information",
    description: "Tell us about your organization",
  },
  { id: 1, title: "Quick Setup", description: "Configure your basic settings" },
  { id: 2, title: "Team Structure", description: "Set up your team hierarchy" },
];

const apiStepName = {
  0: "BASIC_INFO",
  1: "QUICK_SETUP",
  2: "TEAM_STRUCTURE",
};

const OnboardingWizard = () => {
  const userStep = useSelector((state) => state.user.onboardingStep);
  const [currentStep, setCurrentStep] = useState(userStep);
  const onboardingData = useSelector((state) => state.user.onboardingData);
  const navigate = useNavigate();

  const handleStepComplete = async (step, data) => {
    try {
      await onboardingService.updateOnboardingState(step.toLowerCase(), data);
    } catch (error) {
      createErrorToast("Failed to save progress. Please try again.");
      return false;
    }
    return true;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfo
            initialData={onboardingData.basicInfo}
            onNext={async (data) => {
              const success = await handleStepComplete(apiStepName[0], data);
              if (success) setCurrentStep(1);
            }}
          />
        );
      case 1:
        return (
          <QuickSetup
            initialData={onboardingData.quickSetup}
            onNext={async (data) => {
              const success = await handleStepComplete("QUICK_SETUP", data);
              if (success) setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <TeamStructure
            initialData={onboardingData.teamStructure}
            onComplete={async (data) => {
              const success = await handleStepComplete("TEAM_STRUCTURE", data);
              if (success) navigate("/dashboard");
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {steps[currentStep].title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Progress Steps */}
        <nav className="mb-8">
          <ol className="flex items-center justify-center gap-2">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium
                    ${
                      currentStep === step.id
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : currentStep > step.id
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 bg-white text-gray-500"
                    }
                  `}
                >
                  {stepIdx + 1}
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-12 
                      ${currentStep > stepIdx ? "bg-indigo-600" : "bg-gray-200"}
                    `}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Content Area */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6 sm:p-8">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
