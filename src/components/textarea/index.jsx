import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";

const TextareaField = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaField;
