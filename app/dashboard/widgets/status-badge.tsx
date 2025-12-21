 
export type StatusType = 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'info';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      bg: 'bg-brand-primary/10',
      text: 'text-brand-primary',
      border: 'border-brand-primary/20',
      label: 'انجام شده'
    },
    inactive: {
      bg: 'bg-grey-100',
      text: 'text-grey-600',
      border: 'border-grey-300',
      label: 'غیرفعال'
    },
    pending: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
      label: 'در حال بررسی'
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
      label: 'بسته شده'
    },
    error: {
      bg: 'bg-danger/10',
      text: 'text-danger',
      border: 'border-danger/20',
      label: 'باز'
    },
    info: {
      bg: 'bg-[#4A90E2]/10',
      text: 'text-[#4A90E2]',
      border: 'border-[#4A90E2]/20',
      label: 'باز'
    }
  };

  const config = statusConfig[status];

  return (
    <span
      className={`status-badge ${config.bg} ${config.text} ${config.border} ${className}`}
      style={{ fontSize: 'var(--text-body-small)', lineHeight: 'var(--text-body-small-lh)' }}
    >
      {config.label}
    </span>
  );
}
