import React from 'react';
import "@/styles/components.css";


export interface DashboardCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  variant?: 'default' | 'borderless';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = 'primary',
  variant = 'default',
  size = 'md',
  children,
  className = '',
  onClick
}: DashboardCardProps) {
  const cardClasses = [
    'dashboard-card',
    `dashboard-card--${size}`,
    variant === 'borderless' ? 'dashboard-card--borderless' : `dashboard-card--${color}`,
    onClick ? 'dashboard-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const trendClasses = [
    'dashboard-card__trend',
    `dashboard-card__trend--${trend?.type}`
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {icon && (
        <div className="dashboard-card__icon">
          {icon}
        </div>
      )}
      
      {title && (
        <div className="dashboard-card__header">
          <h3 className="dashboard-card__title">{title}</h3>
          {trend && (
            <div className={trendClasses}>
              <span className="dashboard-card__trend-icon">
                {trend.type === 'positive' ? '↗' : trend.type === 'negative' ? '↘' : '→'}
              </span>
              {trend.value}
            </div>
          )}
        </div>
      )}

      {value && (
        <div className="dashboard-card__value">
          {value}
        </div>
      )}

      {subtitle && (
        <div className="dashboard-card__subtitle text-right">
          {subtitle}
        </div>
      )}

      {children && (
        <div className="dashboard-card__content px-[12px] px-[0px] py-[18px]">
          {children}
        </div>
      )}
    </div>
  );
}