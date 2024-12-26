import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";

const DIALOG_SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

const DialogParent = ({
  open,
  children,
  title,
  description,
  onOpenChange,
  icon,
  iconColor = "bg-gray-100",
  size = "lg",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${DIALOG_SIZES[size]}`}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            {icon && (
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${iconColor}`}
              >
                {icon}
              </div>
            )}
            <div className="text-lg font-semibold">{title}</div>
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogParent;
