import { toast } from "react-toastify";

export const createErrorToast = (message) => {
  toast(message, {
    className:
      "shadow-lg bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-red-500 text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2",
    bodyClassName: "flex-1",
    icon: "🚫",
    position: "bottom-right",
    autoClose: 4000,
    progressClassName: "bg-red-500",
  });
};

export const createSuccessToast = (message) => {
  toast(message, {
    className:
      "shadow-lg bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-emerald-500 text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2",
    bodyClassName: "flex-1",
    icon: "✅",
    position: "bottom-right",
    autoClose: 4000,
    progressClassName: "bg-emerald-500",
  });
};
