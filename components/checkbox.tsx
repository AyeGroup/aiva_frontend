import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ 
  id, 
  label, 
  checked, 
  onChange, 
  disabled = false,
  className = '' 
}: CheckboxProps) {
  return (
    <div className={`checkbox-wrapper ${className}`}>
      <label htmlFor={id} className="checkbox-label">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="checkbox-input"
        />
        <span className="checkbox-custom"></span>
        <span className="checkbox-text">{label}</span>
      </label>
    </div>
  );
}
