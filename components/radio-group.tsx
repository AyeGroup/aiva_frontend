import { ReactNode } from 'react';
import "@/styles/components.css";


interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  name?: string;
}

interface RadioItemProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function RadioGroup({ 
  value, 
  onValueChange, 
  children, 
  className = '',
  name = 'radio-group'
}: RadioGroupProps) {
  return (
    <div 
      className={`radio-group ${className}`}
      role="radiogroup"
    >
      {children}
    </div>
  );
}

export function RadioItem({ 
  value, 
  children, 
  className = '',
  disabled = false
}: RadioItemProps) {
  return (
    <label className={`radio-item ${disabled ? 'radio-item-disabled' : ''} ${className}`}>
      <input
        type="radio"
        value={value}
        disabled={disabled}
        className="radio-input"
      />
      <div className="radio-content">
        {children}
      </div>
    </label>
  );
}