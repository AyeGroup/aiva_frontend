import { forwardRef } from 'react';
import { Input } from '../Input/input';

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  allowDecimal?: boolean;
  maxLength?: number;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(({
  allowDecimal = false,
  inputMode = 'numeric',
  pattern = '[0-9]*',
  ...props
}, ref) => {
  return (
    <Input
      ref={ref}
      numeric
      allowDecimal={allowDecimal}
      inputMode={inputMode}
      pattern={pattern}
      {...props}
    />
  );
});

NumericInput.displayName = 'NumericInput';