import { forwardRef, useEffect, useState } from 'react';
import { persianToEnglish, englishToPersian } from '../../../utils/number-utils';
import './input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  numeric?: boolean; // New prop for numeric inputs
  allowDecimal?: boolean; // Allow decimal numbers
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'medium',
  error = false,
  helperText,
  label,
  required = false,
  numeric = false,
  allowDecimal = false,
  className = '',
  onChange,
  value,
  ...props
}, ref) => {
  const baseClasses = 'input-base';
  const variantClasses = `input-${variant}`;
  const sizeClasses = `input-${size}`;
  const errorClasses = error ? 'input-error' : '';
  
  // Internal state for numeric inputs
  const [displayValue, setDisplayValue] = useState('');
  
  // Initialize display value
  useEffect(() => {
    if (numeric && value !== undefined) {
      setDisplayValue(englishToPersian(String(value)));
    }
  }, [numeric, value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (numeric) {
      // Convert Persian digits to English for processing
      let englishValue = persianToEnglish(inputValue);
      
      // Filter only allowed characters
      const allowedChars = allowDecimal ? /[0-9.]/g : /[0-9]/g;
      englishValue = englishValue.match(allowedChars)?.join('') || '';
      
      // Handle decimal point validation
      if (allowDecimal) {
        const parts = englishValue.split('.');
        if (parts.length > 2) {
          // Only allow one decimal point
          englishValue = parts[0] + '.' + parts.slice(1).join('');
        }
      }
      
      // Convert back to Persian for display
      const persianValue = englishToPersian(englishValue);
      setDisplayValue(persianValue);
      
      // Create modified event with English value
      const modifiedEvent = {
        ...e,
        target: {
          ...e.target,
          value: englishValue
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange?.(modifiedEvent);
    } else {
      onChange?.(e);
    }
  };
  
  const inputValue = numeric ? displayValue : value;

  return (
    <div className="input-container">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${errorClasses} ${className}`}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
      
      {helperText && (
        <p className={`input-helper ${error ? 'input-helper-error' : ''}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';