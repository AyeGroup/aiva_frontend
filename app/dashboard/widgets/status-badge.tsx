 
export type StatusType = "open" | "closed" | "in_progress" | "resolved";
 

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    resolved: {
      bg: "bg-brand-primary/10",
      text: "text-brand-primary",
      border: "border-brand-primary/20",
      label: "حل شده",
    },

    in_progress: {
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
      label: "در حال بررسی",
    },
    closed: {
      bg: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
      label: "بسته شده",
    },
    open: {
      bg: "bg-danger/10",
      text: "text-danger",
      border: "border-danger/20",
      label: "باز",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`status-badge ${config?.bg} ${config?.text} ${config?.border} ${className}`}
      style={{ fontSize: 'var(--text-body-small)', lineHeight: 'var(--text-body-small-lh)' }}
    >
      {config?.label}
    </span>
  );
}
