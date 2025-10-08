import React from 'react';
import "@/styles/components.css";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

// Function to convert English numbers to Persian
const convertToPersian = (text: string | number): string => {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  let result = text.toString();
  for (let i = 0; i < englishDigits.length; i++) {
    result = result.replace(new RegExp(englishDigits[i], 'g'), persianDigits[i]);
  }
  return result;
};

export function StatCard({
  label,
  value,
  icon,
  color = 'primary',
  size = 'md',
  className = '',
  onClick
}: StatCardProps) {
  const cardClasses = [
    'stat-card',
    'stat-card--borderless',
    `stat-card--${size}`,
    `stat-card--${color}`,
    onClick ? 'stat-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');





  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Label and Icon */}
      <div className="stat-card__header">
        <div className="stat-card__label text-[16px]">{label}</div>
        {icon && (
          <div className="stat-card__icon flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div className="stat-card__divider"></div>
      
      {/* Value */}
      <div className="stat-card__body">
        <div className="stat-card__value">
          {(() => {
            const convertedValue = convertToPersian(value);
            // Check if value contains number and unit (like "2.8 دقیقه")
            const match = convertedValue.match(/^([\d.,]+)\s+(.+)$/);
            
            if (match) {
              const [, number, unit] = match;
              return (
                <>
                  <span className="text-[24px]">{number}</span>
                  <span className="text-[16px] mr-1">{unit}</span>
                </>
              );
            }
            
            // Default: show entire value with 24px
            return <span className="text-[20px]">{convertedValue}</span>;
          })()}
        </div>

      </div>
    </div>
  );
}