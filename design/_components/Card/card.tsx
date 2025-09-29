import { ReactNode } from 'react';
import './card.css';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'soft-mint' | 'soft-rose';
  elevation?: 'low' | 'md' | 'high';
  padding?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  variant = 'default',
  elevation = 'low',
  padding = 'md',
  radius = 'lg',
  className = '',
  hover = false,
  onClick 
}: CardProps) {
  const baseClasses = 'card animate-soft border';
  
  const variantClasses = {
    default: 'bg-bg-surface border-border-soft',
    'soft-mint': 'bg-bg-soft-mint border-border-soft',
    'soft-rose': 'bg-bg-soft-rose border-border-soft'
  };

  const elevationClasses = {
    low: 'shadow-low',
    md: 'shadow-md',
    high: 'shadow-high'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const radiusClasses = {
    sm: 'rounded-[12px]',
    md: 'rounded-[16px]',
    lg: 'rounded-[20px]',
    xl: 'rounded-[28px]'
  };

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    elevationClasses[elevation],
    paddingClasses[padding],
    radiusClasses[radius],
    hover && 'card-hover cursor-pointer',
    onClick && 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  const style = {
    transition: 'var(--transition-default)',
    borderRadius: `var(--radius-${radius})`,
    boxShadow: `var(--shadow-${elevation})`
  };

  if (onClick) {
    return (
      <button
        className={combinedClasses}
        onClick={onClick}
        style={style}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={`${combinedClasses} mb-6`}
      style={style}
    >
      {children}
    </div>
  );
}