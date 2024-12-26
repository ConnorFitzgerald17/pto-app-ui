import React, { useEffect } from "react";

import InputField from "src/components/input";
import SelectMenu from "src/components/select";
import { Switch } from "@headlessui/react";
import { FREQUENCY_OPTIONS } from "src/constants/policy-constants";

const AccrualRules = ({ formik }) => {
  const isImmediateType = formik.values.accrualRules?.frequency === "IMMEDIATE";

  // Effect to sync maxBalance to amount when frequency is IMMEDIATE
  useEffect(() => {
    if (isImmediateType && formik.values.accrualRules?.maxBalance) {
      formik.setFieldValue(
        "accrualRules.amount",
        formik.values.accrualRules.maxBalance,
      );
    }
  }, [isImmediateType, formik.values.accrualRules?.maxBalance]);

  return (
    <div className="space-y-6">
      <div>
        <SelectMenu
          label="Accrual Frequency"
          id="accrualRules.frequency"
          name="accrualRules.frequency"
          value={formik.values.accrualRules?.frequency}
          onChange={(value) =>
            formik.setFieldValue("accrualRules.frequency", value)
          }
          onBlur={formik.handleBlur}
          error={
            formik.touched.accrualRules?.frequency &&
            formik.errors.accrualRules?.frequency
          }
          options={FREQUENCY_OPTIONS}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="accrualRules.amount"
            name="accrualRules.amount"
            label="Accrual Amount"
            type="number"
            step="0.01"
            value={formik.values.accrualRules?.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accrualRules?.amount &&
              formik.errors.accrualRules?.amount
            }
            placeholder="e.g., 1.67"
            disabled={isImmediateType}
            className={isImmediateType ? "bg-gray-50" : ""}
          />
          {isImmediateType && (
            <p className="mt-1 text-sm text-gray-500">
              Amount automatically set to maximum balance for immediate accrual
            </p>
          )}
        </div>

        <InputField
          id="accrualRules.maxBalance"
          name="accrualRules.maxBalance"
          label="Maximum Balance"
          type="number"
          step="0.5"
          value={formik.values.accrualRules?.maxBalance}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.accrualRules?.maxBalance &&
            formik.errors.accrualRules?.maxBalance
          }
          placeholder="e.g., 30"
        />
      </div>

      {!isImmediateType && (
        <>
          <div>
            <InputField
              id="accrualRules.startDate"
              name="accrualRules.startDate"
              label="Start Date"
              type="date"
              value={formik.values.accrualRules?.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accrualRules?.startDate &&
                formik.errors.accrualRules?.startDate
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                Prorated
              </span>
              <span className="text-sm text-gray-500">
                Enable prorated calculations for partial periods
              </span>
            </div>
            <Switch
              checked={formik.values.accrualRules?.prorated}
              onChange={(checked) =>
                formik.setFieldValue("accrualRules.prorated", checked)
              }
              className={`${
                formik.values.accrualRules?.prorated
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable prorated calculations</span>
              <span
                className={`${
                  formik.values.accrualRules?.prorated
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};

export default AccrualRules;
