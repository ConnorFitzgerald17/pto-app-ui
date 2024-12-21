import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";

const TextareaField = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  rows,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextareaField;
