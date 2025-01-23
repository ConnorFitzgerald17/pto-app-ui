import { useState } from "react";
import { Combobox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const SelectMenu = ({
  options,
  value,
  onChange,
  onBlur,
  multiple = false,
  placeholder = "Select options...",
  error,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const selectedValues = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
    ? [value]
    : [];

  const filteredOptions = multiple
    ? options
    : query === ""
    ? options
    : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      );

  const handleChange = (selectedOption) => {
    if (multiple) {
      const newValue = selectedValues.includes(selectedOption.value)
        ? selectedValues.filter((v) => v !== selectedOption.value)
        : [...selectedValues, selectedOption.value];
      onChange(newValue);
    } else {
      onChange(selectedOption.value);
      setQuery("");
    }
  };

  const handleReset = () => {
    onChange(multiple ? [] : "");
    setQuery("");
  };

  const getDisplayValue = () => {
    if (!selectedValues.length) return "";
    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  };

  const selectedOptions = options.filter((option) =>
    multiple ? selectedValues.includes(option.value) : option.value === value,
  );

  return (
    <div className={className}>
      <Combobox
        as="div"
        value={multiple ? selectedOptions : selectedOptions[0] || null}
        onChange={handleChange}
        multiple={multiple}
      >
        <div className="relative mt-1">
          <div className="relative w-full">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-20 text-sm leading-5 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onChange={(event) => !multiple && setQuery(event.target.value)}
              onBlur={() => {
                setQuery("");
                onBlur?.();
              }}
              displayValue={
                multiple ? getDisplayValue : (option) => option?.label ?? ""
              }
              placeholder={placeholder}
              readOnly={multiple}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
              {(multiple ? selectedValues.length > 0 : value) && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleReset();
                  }}
                  className="p-1 hover:bg-gray-100 rounded-md"
                >
                  <XMarkIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              )}
              <Combobox.Button className="flex items-center">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
          </div>

          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selectedValues.includes(option.value)
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selectedValues.includes(option.value) ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-indigo-600"
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectMenu;
