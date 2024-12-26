import React from "react";
import InputField from "src/components/input";
import { Switch } from "@headlessui/react";

const CarryOver = ({ formik }) => {
  const isImmediateType = formik.values.accrualRules?.frequency === "IMMEDIATE";

  // Disable carry over when frequency is IMMEDIATE
  React.useEffect(() => {
    if (isImmediateType && formik.values.carryOver?.allowed) {
      formik.setFieldValue("carryOver.allowed", false);
      formik.setFieldValue("carryOver.maxDays", "");
      formik.setFieldValue("carryOver.expiryDate", "");
    }
  }, [isImmediateType]);

  if (isImmediateType) {
    return (
      <div className="rounded-md bg-gray-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800">
              Carry Over Not Available
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>
                Carry over is not available for immediate accrual policies. The
                full balance is granted at once and must be used within the
                specified timeframe.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Carry Over Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            Allow Carry Over
          </span>
          <span className="text-sm text-gray-500">
            Enable carrying over unused days to the next period
          </span>
        </div>
        <Switch
          checked={formik.values.carryOver?.allowed}
          onChange={(checked) => {
            formik.setFieldValue("carryOver.allowed", checked);
            if (!checked) {
              // Reset related fields when carry over is disabled
              formik.setFieldValue("carryOver.maxDays", "");
              formik.setFieldValue("carryOver.expiryDate", "");
            }
          }}
          className={`${
            formik.values.carryOver?.allowed ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable carry over</span>
          <span
            className={`${
              formik.values.carryOver?.allowed
                ? "translate-x-6"
                : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      {/* Conditional Fields - Only show if carry over is allowed */}
      {formik.values.carryOver?.allowed && (
        <div className="space-y-6 pt-4">
          <div>
            <InputField
              id="carryOver.maxDays"
              name="carryOver.maxDays"
              label="Maximum Days to Carry Over"
              type="number"
              step="0.5"
              min="0"
              value={formik.values.carryOver?.maxDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.carryOver?.maxDays &&
                formik.errors.carryOver?.maxDays
              }
              placeholder="e.g., 5"
            />
            <p className="mt-1 text-sm text-gray-500">
              Maximum number of days that can be carried over to the next period
            </p>
          </div>

          <div>
            <InputField
              id="carryOver.expiryDate"
              name="carryOver.expiryDate"
              label="Carry Over Expiry Date"
              type="date"
              value={formik.values.carryOver?.expiryDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.carryOver?.expiryDate &&
                formik.errors.carryOver?.expiryDate
              }
            />
            <p className="mt-1 text-sm text-gray-500">
              Date by which carried over days must be used
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarryOver;
