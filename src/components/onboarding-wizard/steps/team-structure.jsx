import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TrashIcon,
  PencilIcon,
  InformationCircleIcon,
  UserGroupIcon,
  CommandLineIcon,
  BriefcaseIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Input from "src/components/input";
import Button from "src/components/button";

const departmentTemplates = [
  {
    id: "BASIC",
    name: "Basic Team",
    description: "Perfect for small teams without complex hierarchy",
    icon: UserGroupIcon,
    isBasic: true,
  },
  {
    id: "TECH",
    name: "Technology",
    description: "Pre-configured tech structure that you can customize",
    subDepartments: ["Engineering", "Product", "Design"],
    icon: CommandLineIcon,
  },
  {
    id: "BUSINESS",
    name: "Business",
    description: "Common business structure that you can adapt",
    subDepartments: ["Sales", "Marketing", "HR"],
    icon: BriefcaseIcon,
  },
  {
    id: "CUSTOM",
    name: "Custom Department",
    description: "Create your own department structure from scratch",
    subDepartments: [],
    icon: Squares2X2Icon,
  },
];

const validationSchema = Yup.object().shape({
  isBasicStructure: Yup.boolean(),
  departments: Yup.array().when("isBasicStructure", {
    is: false,
    then: () =>
      Yup.array().of(
        Yup.object({
          name: Yup.string().required("Department name is required"),
          type: Yup.string().required("Department type is required"),
          subDepartments: Yup.array().of(Yup.string()),
        }),
      ),
    otherwise: () => Yup.array(),
  }),
  teamName: Yup.string().when("isBasicStructure", {
    is: true,
    then: () => Yup.string().required("Team name is required"),
    otherwise: () => Yup.string(),
  }),
});

const TeamStructure = ({ initialData = { departments: [] }, onComplete }) => {
  const [editingDept, setEditingDept] = useState(null);
  const [newSubDepartment, setNewSubDepartment] = useState("");

  const formik = useFormik({
    initialValues: {
      isBasicStructure: false,
      teamName: "",
      departments: initialData.departments,
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.isBasicStructure) {
        onComplete({
          type: "BASIC",
          teamName: values.teamName,
        });
      } else {
        onComplete({
          type: "DEPARTMENT",
          departments: values.departments.map((dept) => ({
            name: dept.name,
            type: dept.type,
            subDepartments: dept.subDepartments,
          })),
        });
      }
    },
  });

  const handletypeChange = (isBasic) => {
    formik.setValues({
      isBasicStructure: isBasic,
      teamName: "",
      departments: [],
    });
  };

  const handleAddDepartment = (template) => {
    if (template.id === "BASIC") {
      handletypeChange(true);
      return;
    }

    handletypeChange(false);
    const newDepartment = {
      name: template.name,
      type: template.id,
      subDepartments: template.subDepartments || [],
    };

    formik.setFieldValue("departments", [
      ...formik.values.departments,
      newDepartment,
    ]);
  };

  const handleRemoveDepartment = (index) => {
    const newDepartments = formik.values.departments.filter(
      (_, i) => i !== index,
    );
    formik.setFieldValue("departments", newDepartments);
  };

  const handleAddSubDepartment = (deptIndex) => {
    if (!newSubDepartment.trim()) return;

    const updatedDepartments = [...formik.values.departments];
    updatedDepartments[deptIndex].subDepartments.push(newSubDepartment.trim());
    formik.setFieldValue("departments", updatedDepartments);
    setNewSubDepartment("");
  };

  const handleRemoveSubDepartment = (deptIndex, subDeptIndex) => {
    const updatedDepartments = [...formik.values.departments];
    updatedDepartments[deptIndex].subDepartments.splice(subDeptIndex, 1);
    formik.setFieldValue("departments", updatedDepartments);
  };

  return (
    <div className="space-y-6">
      {/* Info Section */}
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Choose Your Structure
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-inside list-disc space-y-1">
                <li>Basic Team: Perfect for small teams without departments</li>
                <li>
                  Department Structure: For organizations with multiple teams
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {departmentTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleAddDepartment(template)}
              className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all
                ${
                  template.isBasic
                    ? "border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                    : "border-dashed border-gray-300 hover:border-indigo-500 hover:bg-gray-50"
                }
              `}
            >
              <Icon className="h-6 w-6 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-900">
                {template.name}
              </span>
              <span className="mt-1 text-center text-xs text-gray-500">
                {template.description}
              </span>
              {template.subDepartments &&
                template.subDepartments.length > 0 && (
                  <span className="mt-2 text-center text-xs text-gray-400">
                    Suggested teams: {template.subDepartments.join(", ")}
                  </span>
                )}
            </button>
          );
        })}
      </div>

      {/* Basic Team Structure */}
      {formik.values.isBasicStructure && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="max-w-md">
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700"
            >
              Team Name
            </label>
            <Input
              type="text"
              id="teamName"
              name="teamName"
              value={formik.values.teamName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your team name"
            />
            {formik.touched.teamName && formik.errors.teamName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.teamName}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Department List */}
      {!formik.values.isBasicStructure &&
        formik.values.departments.length > 0 && (
          <div className="space-y-3">
            {formik.values.departments.map((dept, deptIndex) => (
              <div
                key={deptIndex}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    {editingDept === deptIndex ? (
                      <Input
                        type="text"
                        value={dept.name}
                        onChange={(e) => {
                          const updatedDepartments = [
                            ...formik.values.departments,
                          ];
                          updatedDepartments[deptIndex].name = e.target.value;
                          formik.setFieldValue(
                            "departments",
                            updatedDepartments,
                          );
                        }}
                        onBlur={() => setEditingDept(null)}
                        className="rounded-md border-gray-300 text-sm font-medium"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {dept.name}
                        </h3>
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => setEditingDept(deptIndex)}
                          className="ml-2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Sub-departments */}
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {dept.subDepartments.map((subDept, subIndex) => (
                          <span
                            key={subIndex}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs"
                          >
                            {subDept}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSubDepartment(deptIndex, subIndex)
                              }
                              className="ml-1 text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center">
                        <Input
                          type="text"
                          placeholder="Add team"
                          value={newSubDepartment}
                          onChange={(e) => setNewSubDepartment(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddSubDepartment(deptIndex);
                            }
                          }}
                          className="mr-2 w-32 rounded-md border-gray-300 text-sm"
                        />
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => handleAddSubDepartment(deptIndex)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => handleRemoveDepartment(deptIndex)}
                    className="ml-4 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        {formik.values.isBasicStructure && (
          <Button
            variant="secondary"
            type="button"
            onClick={() => handletypeChange(false)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Switch to Departments
          </Button>
        )}
        <button
          type="button"
          onClick={formik.handleSubmit}
          disabled={
            (formik.values.isBasicStructure && !formik.values.teamName) ||
            (!formik.values.isBasicStructure &&
              formik.values.departments.length === 0)
          }
          className="ml-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default TeamStructure;
