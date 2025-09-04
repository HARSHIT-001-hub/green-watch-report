import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "in-progress" | "resolved";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-muted text-muted-foreground"
    },
    "in-progress": {
      label: "In Progress", 
      className: "bg-warning text-warning-foreground"
    },
    resolved: {
      label: "Resolved",
      className: "bg-success text-success-foreground"
    }
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};