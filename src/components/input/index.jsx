import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
