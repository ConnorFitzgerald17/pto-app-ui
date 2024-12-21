import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

const SelectMenu = ({
  options,
  value,
  onChange,
  optional = false,
  optionalText = "None",
  placeholder = "Select an option",
}) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      defaultValue=""
      required={false}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="w-full">
        {optional && (
          <SelectItem value={null} className="w-full cursor-pointer">
            {optionalText}
          </SelectItem>
        )}
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="w-full cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
