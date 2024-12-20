import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";

const InputField = ({ id, label, type, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
