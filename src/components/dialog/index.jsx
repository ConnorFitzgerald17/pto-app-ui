import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";

const DialogParent = ({
  open,
  children,
  title,
  description,
  onOpenChange,
  icon,
  iconColor = "bg-gray-100",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
