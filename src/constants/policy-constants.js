export const DIALOG_SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export const FREQUENCY_OPTIONS = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
  { value: "YEARLY", label: "Yearly" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "BI_WEEKLY", label: "Bi-Weekly" },
  { value: "SEMI_MONTHLY", label: "Semi-Monthly" },
  { value: "IMMEDIATE", label: "Immediate" },
];

export const POLICY_TYPES = [
  { value: "PTO", label: "Paid Time Off" },
  { value: "SICK", label: "Sick Leave" },
  { value: "PARENTAL", label: "Parental Leave" },
  { value: "UNPAID", label: "Unpaid Leave" },
  { value: "CUSTOM", label: "Custom" },
];

export const POLICY_STATUS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "DRAFT", label: "Draft" },
];

export const POLICY_STEPS = [
  {
    id: 1,
    name: "Basic Information",
    description:
      "Enter the basic details of your policy including name, description, type, and status.",
  },
  {
    id: 2,
    name: "Accrual Rules",
    description:
      "Define how and when time off is accrued, including frequency, amounts, and maximum balances.",
  },
  {
    id: 3,
    name: "Carry Over",
    description:
      "Specify if and how unused time can be carried over to the next period.",
  },
  {
    id: 4,
    name: "Restrictions",
    description:
      "Set up policy restrictions including notice periods, consecutive days, and blackout dates.",
  },
];
