import React from "react";

const classes = {
  default:
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  error:
    "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6",
};

const Input = ({
  id,
  type = "text",
  label = false,
  placeholder = "",
  value,
  onChange,
  hasError = false,
  error = "",
  hint = false,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          type={type}
          name={id}
          id={id}
          className={hasError ? classes.error : classes.default}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {hint && !hasError && (
        <p className="mt-2 text-sm text-gray-500">{hint}</p>
      )}
      {hasError && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
