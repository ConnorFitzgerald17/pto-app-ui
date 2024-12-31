import { toast } from "react-toastify";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const createErrorToast = (message) => {
  toast(message, {
    className:
      "shadow-lg bg-white dark:bg-gray-900 p-4 rounded-xl border border-red-200 dark:border-red-800 text-gray-900 dark:text-gray-100 font-medium flex items-center gap-3",
    bodyClassName: "flex-1 text-sm",
    icon: ExclamationCircleIcon,
    position: "bottom-right",
    autoClose: 4000,
    progressClassName: "bg-red-500 dark:bg-red-400",
  });
};

export const createSuccessToast = (message) => {
  toast(message, {
    className:
      "shadow-lg bg-green-50 dark:bg-gray-900 p-4 rounded-xl border border-green-200 dark:border-green-800 text-gray-900 dark:text-gray-100 font-medium flex items-center gap-3",
    bodyClassName: "flex-1 text-sm",
    icon: CheckCircleIcon,
    position: "bottom-right",
    autoClose: 4000,
    progressClassName: "bg-green-500 dark:bg-green-400",
  });
};
