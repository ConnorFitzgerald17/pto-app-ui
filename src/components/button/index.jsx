import clsx from "clsx";
import React from "react";

const classes = {
  primary:
    "flex justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  tertiary:
    "flex justify-center rounded-md border border-gray-200 py-2 px-4 text-sm font-medium text-gray-600 shadow-sm hover:border-gray-300 hover:bg-gray-50 focus:outline-none",
  disabled: "cursor-default opacity-60",
  ghost:
    "flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-gray-600  hover:border-gray-300 hover:bg-gray-50 focus:outline-none",
};

const Button = ({
  className,
  children,
  type,
  isLoading = false,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        classes[variant],
        className,
        (disabled || isLoading) && classes.disabled,
        fullWidth && "w-full",
      )}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
