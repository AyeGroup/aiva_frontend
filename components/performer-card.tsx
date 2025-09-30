import React from 'react';
import "@/styles/components.css";


export interface PerformerCardProps {
  name: string;
  avatar?: string;
  subtitle?: string;
  value: string | number;
  progress?: number; // 0-100
  rank?: number;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  className?: string;
  onClick?: () => void;
}

export function PerformerCard({
  name,
  avatar,
  subtitle,
  value,
  progress,
  rank,
  color = 'primary',
  className = '',
  onClick
}: PerformerCardProps) {
  const cardClasses = [
    'performer-card',
    onClick ? 'performer-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const progressClasses = [
    'performer-card__progress-bar',
    `performer-card__progress-bar--${color}`
  ].filter(Boolean).join(' ');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className={`${cardClasses} !bg-transparent !shadow-none !border-transparent`} onClick={onClick}>
      <div className="performer-card__content">
        <div className="performer-card__header">
          
          <div className="performer-card__avatar">
            {avatar ? (
              <img src={avatar} alt={name} className="performer-card__avatar-image" />
            ) : (
              <div className="performer-card__avatar-placeholder">
                {getInitials(name)}
              </div>
            )}
          </div>
          
          <div className="performer-card__info text-right">
            <h4 className="performer-card__name">{name}</h4>
          
          </div>
        </div>
        
        <div className="performer-card__value">
          {value}
        </div>
      </div>
      
      {/* Performance & Interaction Stats */}

   
    </div>
  );
}