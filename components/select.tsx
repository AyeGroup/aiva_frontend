import { forwardRef, ReactNode, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import "@/styles/components.css";


interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'default' | 'bordered' | 'modern';
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  children: ReactNode;
  onValueChange?: (value: string) => void;
  icon?: ReactNode;
  showCheck?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((
  {
    variant = 'modern',
    size = 'medium',
    error = false,
    helperText,
    label,
    placeholder,
    children,
    className = '',
    onValueChange,
    onChange,
    icon,
    showCheck = false,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  const baseClasses = 'select-base';
  const variantClasses = `select-${variant}`;
  const sizeClasses = `select-${size}`;
  const errorClasses = error ? 'select-error' : '';
  const focusClasses = isFocused ? 'select-focused' : '';
  const hasValueClasses = hasValue ? 'select-has-value' : '';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setHasValue(!!value);
    
    if (onChange) {
      onChange(event);
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  return (
    <div className="select-container">
      {label && (
        <label className="select-label">
          <div className="select-label-content">
            {icon && <span className="select-label-icon">{icon}</span>}
            <span>{label}</span>
            {props.required && <span className="select-required">*</span>}
          </div>
        </label>
      )}
      
      <div className={`select-wrapper ${focusClasses} ${hasValueClasses} ${errorClasses}`}>
        <select
          ref={ref}
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
          style={{ border: 'none', outline: 'none' }}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        <div className="select-icons">
          {showCheck && hasValue && (
            <div className="select-check-icon">
              <Check className="w-4 h-4" />
            </div>
          )}
          <div className="select-chevron-icon">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
        
        {/* شامل شدن subtle gradient overlay برای مدرن بودن */}
        <div className="select-overlay"></div>
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