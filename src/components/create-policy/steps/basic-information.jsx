import React from "react";
import InputField from "src/components/input";
import TextareaField from "src/components/textarea";
import SelectMenu from "src/components/select";
import { POLICY_TYPES, POLICY_STATUS } from "src/constants/policy-constants";

const BasicInformation = ({ formik }) => {
  return (
    <div className="space-y-6">
      <div>
        <InputField
          id="name"
          name="name"
          label="Policy Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          placeholder="e.g., Standard Annual Leave"
        />
      </div>

      <div>
        <TextareaField
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && formik.errors.description}
          placeholder="Describe the purpose and scope of this policy"
          rows={4}
        />
      </div>

      <div>
        <SelectMenu
          label="Policy Type"
          id="type"
          name="type"
          value={formik.values.type}
          onChange={(value) => formik.setFieldValue("type", value)}
          onBlur={formik.handleBlur}
          error={formik.touched.type && formik.errors.type}
          options={POLICY_TYPES}
        />
      </div>

      <div>
        <SelectMenu
          label="Status"
          id="status"
          name="status"
          value={formik.values.status}
          onChange={(value) => formik.setFieldValue("status", value)}
          onBlur={formik.handleBlur}
          error={formik.touched.status && formik.errors.status}
          options={POLICY_STATUS}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
