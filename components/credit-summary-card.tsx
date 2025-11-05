import React from 'react';
// import './credit-summary-card.css';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export interface CreditSummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
  icon: React.ReactNode;
}

export function CreditSummaryCard({
  title,
  value,
  subtitle,
  trend = 'neutral',
  trendValue,
  color,
  icon
}: CreditSummaryCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" style={{ color: '#52d4a0' }} />;
      case 'down':
        return <TrendingDown className="w-4 h-4" style={{ color: '#FF6B6B' }} />;
      default:
        return <Activity className="w-4 h-4" style={{ color }} />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return '#52d4a0';
      case 'down':
        return '#FF6B6B';
      default:
        return color;
    }
  };

  return (
    <article 
      className="credit-summary-card"
      style={{
        background: `linear-gradient(135deg, ${color}08 0%, ${color}03 100%)`,
        borderRight: `4px solid ${color}`
      }}
      dir="rtl"
    >
      <div className="credit-summary-card-content">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
              >
                {React.cloneElement(icon as React.ReactElement, {
                  // className: 'w-5 h-5',
                  // style: { color }
                  //elham
                })}
              </div>
              <h3 className="text-grey-700 text-sm">{title}</h3>
            </div>
            
            <div className="mb-2">
              <div 
                className="text-3xl mb-1"
                style={{ color }}
              >
                {value}
              </div>
              {subtitle && (
                <p className="text-grey-500 text-sm">{subtitle}</p>
              )}
            </div>

            {trendValue && (
              <div className="flex items-center gap-2">
                {getTrendIcon()}
                <span 
                  className="text-sm"
                  style={{ color: getTrendColor() }}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
