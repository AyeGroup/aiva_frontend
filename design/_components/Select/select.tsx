import { forwardRef, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import './select.css';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'default' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  children: ReactNode;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  variant = 'default',
  size = 'medium',
  error = false,
  helperText,
  label,
  placeholder,
  children,
  className = '',
  onValueChange,
  onChange,
  ...props
}, ref) => {
  const baseClasses = 'select-base';
  const variantClasses = `select-${variant}`;
  const sizeClasses = `select-${size}`;
  const errorClasses = error ? 'select-error' : '';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event);
    }
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };

  return (
    <div className="select-container">
      {label && (
        <label className="select-label">
          {label}
          {props.required && <span className="select-required">*</span>}
        </label>
      )}
      
      <div className="select-wrapper">
        <select
          ref={ref}
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${errorClasses} ${className}`}
          onChange={handleChange}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        <div className="select-icon">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      
      {helperText && (
        <p className={`select-helper ${error ? 'select-helper-error' : ''}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';