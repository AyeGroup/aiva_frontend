import { useState, useCallback } from 'react';
import { persianToEnglish, englishToPersian, formatNumberForDisplay, parseNumberForProcessing } from './number-utils';

export interface UseNumericInputOptions {
  initialValue?: string;
  maxLength?: number;
  allowDecimal?: boolean;
  onValueChange?: (englishValue: string, persianValue: string) => void;
}

export function useNumericInput(options: UseNumericInputOptions = {}) {
  const { initialValue = '', maxLength, allowDecimal = false, onValueChange } = options;
  
  // Store the raw English value internally
  const [internalValue, setInternalValue] = useState(() => 
    parseNumberForProcessing(initialValue)
  );
  
  // Display value in Persian
  const displayValue = formatNumberForDisplay(internalValue);
  
  const handleChange = useCallback((inputValue: string) => {
    // Convert Persian digits to English
    let englishValue = persianToEnglish(inputValue);
    
    // Allow only digits and decimal point if enabled
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
    
    // Apply max length if specified
    if (maxLength && englishValue.length > maxLength) {
      englishValue = englishValue.slice(0, maxLength);
    }
    
    // Update internal state
    setInternalValue(englishValue);
    
    // Convert back to Persian for display
    const persianValue = formatNumberForDisplay(englishValue);
    
    // Call callback if provided
    if (onValueChange) {
      onValueChange(englishValue, persianValue);
    }
  }, [allowDecimal, maxLength, onValueChange]);
  
  const setValue = useCallback((value: string) => {
    const englishValue = parseNumberForProcessing(value);
    setInternalValue(englishValue);
  }, []);
  
  const reset = useCallback(() => {
    setInternalValue('');
  }, []);
  
  return {
    // The value to display in the input (Persian digits)
    displayValue,
    // The actual English value for processing
    value: internalValue,
    // Handler for input changes
    onChange: handleChange,
    // Programmatically set value
    setValue,
    // Reset to empty
    reset,
    // Check if has value
    hasValue: internalValue.length > 0
  };
}