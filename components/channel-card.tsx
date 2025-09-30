import React from 'react';
import "@/styles/components.css";


export interface ChannelCardProps {
  name: string;
  icon: React.ReactNode;
  value: string | number;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  color?: string;
  className?: string;
  onClick?: () => void;
}

export function ChannelCard({
  name,
  icon,
  value,
  change,
  color,
  className = '',
  onClick
}: ChannelCardProps) {
  const cardClasses = [
    'channel-card',
    onClick ? 'channel-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const changeClasses = [
    'channel-card__change',
    change ? `channel-card__change--${change.type}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="channel-card__header">
        <div 
          className="channel-card__icon"
          style={color ? { backgroundColor: color } : {}}
        >
          {icon}
        </div>
        <div className="channel-card__info">
          <h4 className="channel-card__name">{name}</h4>
          {change && (
            <div className={changeClasses}>
              <span className="channel-card__change-indicator">
                {change.type === 'positive' ? '+' : change.type === 'negative' ? '-' : ''}
              </span>
              {change.value}
            </div>
          )}
        </div>
      </div>
      
      <div className="channel-card__value">
        {value}
      </div>
    </div>
  );
}