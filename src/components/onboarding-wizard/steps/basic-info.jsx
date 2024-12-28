import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "src/components/input";
import SelectMenu from "src/components/select";
import Button from "src/components/button";

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const adminRoles = [
  { value: "CEO", label: "CEO" },
  { value: "HR_MANAGER", label: "HR Manager" },
  { value: "OPERATIONS_MANAGER", label: "Operations Manager" },
  { value: "OTHER", label: "Other" },
];

const BasicInfo = ({ initialData, onNext }) => {
  const formik = useFormik({
    initialValues: {
      companySize: initialData?.companySize || "",
      adminRole: initialData?.adminRole || "",
      customAdminRole: initialData?.customAdminRole || "",
    },
    validationSchema: Yup.object({
      companySize: Yup.string().required("Company size is required"),
      adminRole: Yup.string().required("Role is required"),
      customAdminRole: Yup.string().when("adminRole", {
        is: "OTHER",
        then: () => Yup.string().required("Please specify your role"),
        otherwise: () => Yup.string(),
      }),
    }),
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tell us about your organization
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Size
          </label>
          <SelectMenu
            options={companySizes}
            value={formik.values.companySize}
            onChange={(value) => formik.setFieldValue("companySize", value)}
            placeholder="Select company size"
          />
          {formik.touched.companySize && formik.errors.companySize && (
            <div className="mt-1 text-sm text-red-600">
              {formik.errors.companySize}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Role
          </label>
          <SelectMenu
            options={adminRoles}
            value={formik.values.adminRole}
            onChange={(value) => formik.setFieldValue("adminRole", value)}
            placeholder="Select your role"
          />
          {formik.touched.adminRole && formik.errors.adminRole && (
            <div className="mt-1 text-sm text-red-600">
              {formik.errors.adminRole}
            </div>
          )}
        </div>

        {formik.values.adminRole === "OTHER" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specify Your Role
            </label>
            <Input
              type="text"
              id="customAdminRole"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customAdminRole}
              placeholder="Enter your role"
            />
            {formik.touched.customAdminRole &&
              formik.errors.customAdminRole && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.customAdminRole}
                </div>
              )}
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
