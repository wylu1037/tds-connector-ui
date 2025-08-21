import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface ActionDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ActionDialog({
  trigger,
  title,
  description,
  open,
  onOpenChange,
  children,
  maxWidth = "md",
  className,
}: ActionDialogProps) {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "sm:max-w-[400px]";
      case "md":
        return "sm:max-w-[500px]";
      case "lg":
        return "sm:max-w-[600px]";
      case "xl":
        return "sm:max-w-[700px]";
      default:
        return "sm:max-w-[500px]";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`${getMaxWidthClass()} ${className || ""}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
