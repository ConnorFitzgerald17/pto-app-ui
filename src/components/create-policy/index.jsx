import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { decodeAPIMessage } from "src/utils/decode-api-message";
import { get } from "lodash";

import DialogParent from "src/components/dialog";
import BasicInformation from "./steps/basic-information";
import AccrualRules from "./steps/accrual-rules";
import CarryOver from "./steps/carry-over";
import Restrictions from "./steps/restrictions";
import policyThunks from "src/state/policy/thunks";
import { POLICY_STEPS } from "src/constants/policy-constants";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Policy name is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Policy type is required"),
  status: Yup.string().required("Status is required"),
  accrualRules: Yup.object().shape({
    frequency: Yup.string().required("Frequency is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(0, "Amount must be positive"),
    maxBalance: Yup.number()
      .required("Maximum balance is required")
      .min(0, "Maximum balance must be positive"),
    startDate: Yup.date().when("frequency", {
      is: "IMMEDIATE",
      then: () => Yup.date().nullable(),
      otherwise: () => Yup.date().required("Start date is required"),
    }),
    prorated: Yup.boolean(),
  }),
  carryOver: Yup.object().shape({
    allowed: Yup.boolean(),
    maxDays: Yup.number().when("allowed", {
      is: true,
      then: () =>
        Yup.number()
          .required("Maximum days is required when carry over is allowed")
          .min(0, "Maximum days must be positive"),
      otherwise: () => Yup.number().nullable(),
    }),
    expiryDate: Yup.date().when("allowed", {
      is: true,
      then: () =>
        Yup.date().required(
          "Expiry date is required when carry over is allowed",
        ),
      otherwise: () => Yup.date().nullable(),
    }),
  }),
  restrictions: Yup.object().shape({
    minDaysNotice: Yup.number()
      .min(0, "Minimum notice days must be positive")
      .required("Minimum notice days is required"),
    maxConsecutiveDays: Yup.number()
      .min(0, "Maximum consecutive days must be positive")
      .required("Maximum consecutive days is required"),
    minIncrement: Yup.number()
      .min(0.5, "Minimum increment must be at least 0.5")
      .required("Minimum increment is required"),
    blackoutDates: Yup.array().of(
      Yup.object().shape({
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date()
          .required("End date is required")
          .min(Yup.ref("startDate"), "End date must be after start date"),
        reason: Yup.string().required("Reason is required"),
        recurring: Yup.boolean(),
      }),
    ),
  }),
});

const initialValues = {
  name: "",
  description: "",
  type: "",
  status: "DRAFT",
  accrualRules: {
    frequency: "",
    amount: "",
    maxBalance: "",
    startDate: "",
    prorated: false,
  },
  carryOver: {
    allowed: false,
    maxDays: "",
    expiryDate: "",
  },
  restrictions: {
    minDaysNotice: "",
    maxConsecutiveDays: "",
    minIncrement: 0.5,
    blackoutDates: [],
  },
};

const CreatePolicyModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = POLICY_STEPS.length;
  const dispatch = useDispatch();

  const getStepErrors = (step, errors, touched) => {
    switch (step) {
      case 1: // Basic Information
        return !!(
          (touched.name && errors.name) ||
          (touched.description && errors.description) ||
          (touched.type && errors.type) ||
          (touched.status && errors.status)
        );
      case 2: // Accrual Rules
        return !!(
          touched.accrualRules &&
          errors.accrualRules &&
          Object.keys(errors.accrualRules).length > 0
        );
      case 3: // Carry Over
        return !!(
          touched.carryOver &&
          errors.carryOver &&
          Object.keys(errors.carryOver).length > 0
        );
      case 4: // Restrictions
        return !!(
          touched.restrictions &&
          errors.restrictions &&
          Object.keys(errors.restrictions).length > 0
        );
      default:
        return false;
    }
  };

  const getCurrentStepDescription = () => {
    const currentStepData = POLICY_STEPS.find(
      (step) => step.id === currentStep,
    );
    return (
      currentStepData?.description ||
      "Set up a new policy by following these steps."
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(
          policyThunks.createPolicy(
            { data: values },
            (err) => {
              if (!err) {
                createSuccessToast(toastMessages.CREATE_POLICY_SUCCESSFUL);
                resetForm();
                onClose();
                return;
              }
              createErrorToast(
                decodeAPIMessage(get(err, "response.data.error", "")),
              );
            },
            false,
          ),
        );
      } catch (error) {
        console.error("Error creating role:", error);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    formik.setErrors({});
    formik.setTouched({});
    setCurrentStep(1);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformation formik={formik} />;
      case 2:
        return <AccrualRules formik={formik} />;
      case 3:
        return <CarryOver formik={formik} />;
      case 4:
        return <Restrictions formik={formik} />;
      default:
        return null;
    }
  };

  return (
    <DialogParent
      icon={<ClipboardIcon className="h-6 w-6" />}
      iconColor="bg-blue-100"
      title="Create Policy"
      description={getCurrentStepDescription()}
      open={isOpen}
      onOpenChange={handleClose}
      size="3xl"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="py-4">
          {/* Updated Stepper with clickable tabs */}
          <nav aria-label="Progress">
            <ol
              role="list"
              className="space-y-4 md:flex md:space-x-8 md:space-y-0"
            >
              {POLICY_STEPS.map((step) => {
                const hasError = getStepErrors(
                  step.id,
                  formik.errors,
                  formik.touched,
                );
                return (
                  <li key={step.name} className="md:flex-1">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full focus:outline-none ${
                        currentStep >= step.id
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      disabled={currentStep < step.id}
                    >
                      <div
                        className={`flex flex-col border-l-4 ${
                          currentStep >= step.id
                            ? hasError
                              ? "border-red-500"
                              : "border-blue-600"
                            : "border-gray-200"
                        } py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                          currentStep >= step.id && !hasError
                            ? "hover:border-blue-800"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            currentStep >= step.id
                              ? hasError
                                ? "text-red-500"
                                : "text-blue-600"
                              : "text-gray-500"
                          } ${
                            currentStep >= step.id && !hasError
                              ? "group-hover:text-blue-800"
                              : ""
                          }`}
                        >
                          Step {step.id}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            hasError ? "text-red-500" : "text-gray-900"
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Rest of the form remains the same */}
          <div className="mt-8">{renderStep()}</div>

          <div className="mt-8 flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type={currentStep === totalSteps ? "submit" : "button"}
              onClick={() => {
                if (currentStep < totalSteps) {
                  setCurrentStep(Math.min(totalSteps, currentStep + 1));
                }
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {currentStep === totalSteps ? "Create Policy" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </DialogParent>
  );
};

export default CreatePolicyModal;
