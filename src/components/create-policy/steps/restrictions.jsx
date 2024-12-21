import React from "react";
import InputField from "src/components/input";
import { Switch } from "@headlessui/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const Restrictions = ({ formik }) => {
  const addBlackoutDate = () => {
    const blackoutDates = [...formik.values.restrictions.blackoutDates];
    blackoutDates.push({
      startDate: "",
      endDate: "",
      reason: "",
      recurring: false,
    });
    formik.setFieldValue("restrictions.blackoutDates", blackoutDates);
  };

  const removeBlackoutDate = (index) => {
    const blackoutDates = [...formik.values.restrictions.blackoutDates];
    blackoutDates.splice(index, 1);
    formik.setFieldValue("restrictions.blackoutDates", blackoutDates);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="restrictions.minDaysNotice"
          name="restrictions.minDaysNotice"
          label="Minimum Notice Days"
          type="number"
          min="0"
          value={formik.values.restrictions?.minDaysNotice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.restrictions?.minDaysNotice &&
            formik.errors.restrictions?.minDaysNotice
          }
          placeholder="e.g., 14"
        />

        <InputField
          id="restrictions.maxConsecutiveDays"
          name="restrictions.maxConsecutiveDays"
          label="Maximum Consecutive Days"
          type="number"
          min="0"
          value={formik.values.restrictions?.maxConsecutiveDays}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.restrictions?.maxConsecutiveDays &&
            formik.errors.restrictions?.maxConsecutiveDays
          }
          placeholder="e.g., 15"
        />
      </div>

      <div>
        <InputField
          id="restrictions.minIncrement"
          name="restrictions.minIncrement"
          label="Minimum Increment (Days)"
          type="number"
          step="0.5"
          min="0.5"
          value={formik.values.restrictions?.minIncrement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.restrictions?.minIncrement &&
            formik.errors.restrictions?.minIncrement
          }
          placeholder="e.g., 0.5"
        />
        <p className="mt-1 text-sm text-gray-500">
          Minimum number of days that can be requested (0.5 for half days)
        </p>
      </div>

      {/* Blackout Dates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Blackout Dates</h3>
          <button
            type="button"
            onClick={addBlackoutDate}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Period
          </button>
        </div>

        <div className="space-y-4">
          {formik.values.restrictions.blackoutDates.map((_, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg space-y-4 relative"
            >
              <button
                type="button"
                onClick={() => removeBlackoutDate(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  id={`restrictions.blackoutDates.${index}.startDate`}
                  name={`restrictions.blackoutDates.${index}.startDate`}
                  label="Start Date"
                  type="date"
                  value={
                    formik.values.restrictions.blackoutDates[index].startDate
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.restrictions?.blackoutDates?.[index]
                      ?.startDate &&
                    formik.errors.restrictions?.blackoutDates?.[index]
                      ?.startDate
                  }
                />

                <InputField
                  id={`restrictions.blackoutDates.${index}.endDate`}
                  name={`restrictions.blackoutDates.${index}.endDate`}
                  label="End Date"
                  type="date"
                  value={
                    formik.values.restrictions.blackoutDates[index].endDate
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.restrictions?.blackoutDates?.[index]
                      ?.endDate &&
                    formik.errors.restrictions?.blackoutDates?.[index]?.endDate
                  }
                />
              </div>

              <InputField
                id={`restrictions.blackoutDates.${index}.reason`}
                name={`restrictions.blackoutDates.${index}.reason`}
                label="Reason"
                type="text"
                value={formik.values.restrictions.blackoutDates[index].reason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.restrictions?.blackoutDates?.[index]?.reason &&
                  formik.errors.restrictions?.blackoutDates?.[index]?.reason
                }
                placeholder="e.g., Holiday Season"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Recurring Annually
                </span>
                <Switch
                  checked={
                    formik.values.restrictions.blackoutDates[index].recurring
                  }
                  onChange={(checked) =>
                    formik.setFieldValue(
                      `restrictions.blackoutDates.${index}.recurring`,
                      checked,
                    )
                  }
                  className={`${
                    formik.values.restrictions.blackoutDates[index].recurring
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable recurring</span>
                  <span
                    className={`${
                      formik.values.restrictions.blackoutDates[index].recurring
                        ? "translate-x-6"
                        : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restrictions;
