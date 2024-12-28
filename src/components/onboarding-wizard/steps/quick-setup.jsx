import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InformationCircleIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Button from "src/components/button";

const setupTypes = [
  {
    id: "STANDARD",
    title: "Standard Setup",
    description: "Get started quickly with our recommended settings",
    icon: SparklesIcon,
    features: [
      "10 days annual vacation",
      "5 days sick leave",
      "Standard approval workflow",
      "Basic reporting",
    ],
    timeToSetup: "2 minutes to complete",
    recommended: true,
  },
  {
    id: "CUSTOM",
    title: "Custom Setup",
    description: "Configure your own policy settings after onboarding",
    icon: WrenchScrewdriverIcon,
    features: [
      "Custom vacation allowance",
      "Flexible sick leave policy",
      "Advanced approval rules",
      "Detailed reporting options",
    ],
    timeToSetup: "10-15 minutes to complete",
    warning: "Requires additional policy setup after onboarding",
  },
];

const validationSchema = Yup.object({
  setupType: Yup.string()
    .required("Please select a setup type")
    .oneOf(["STANDARD", "CUSTOM"]),
});

const QuickSetup = ({ onNext }) => {
  const formik = useFormik({
    initialValues: {
      setupType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Choose Your Setup Preference
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Start with our recommended settings for instant setup, or choose
                custom setup to configure your policies in detail after
                onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Options */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {setupTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => formik.setFieldValue("setupType", type.id)}
              className={`relative flex flex-col items-start rounded-lg border-2 p-6 text-left transition-all
                ${
                  formik.values.setupType === type.id
                    ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                    : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                }
              `}
            >
              {type.recommended && (
                <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                  Recommended
                </span>
              )}

              <Icon className="h-6 w-6 text-gray-400" />

              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {type.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{type.description}</p>

              <ul className="mt-4 space-y-2">
                {type.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-gray-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <ClockIcon className="mr-1.5 h-4 w-4" />
                {type.timeToSetup}
              </div>

              {type.warning && (
                <div className="mt-3 rounded-md bg-yellow-50 p-3">
                  <div className="flex">
                    <InformationCircleIcon className="h-5 w-5 text-yellow-400" />
                    <p className="ml-2 text-sm text-yellow-700">
                      {type.warning}
                    </p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={formik.handleSubmit}
          disabled={!formik.values.setupType}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default QuickSetup;
