import { toast } from "react-toastify";

export const createErrorToast = (message) => {
  toast(message, {
    className:
      "shadow-lg bg-red-500 p-4 text-white text-sm font-bold rounded-md ring-1 ring-black ring-opacity-5",
    bodyClassName: "m-0",
  });
};

export const createSuccessToast = (message) => {
  toast(message, {
    className:
      "shadow-lg bg-emerald-500 p-4 text-white text-sm font-bold rounded-md ring-1 ring-black ring-opacity-5",
    bodyClassName: "m-0",
  });
};
