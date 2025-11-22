/**
 * Utility functions for converting between Persian and English numbers
 */

// Map Persian digits to English digits
const persianToEnglishDigits: Record<string, string> = {
  '۰': '0',
  '۱': '1', 
  '۲': '2',
  '۳': '3',
  
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9'
};

// Map English digits to Persian digits
const englishToPersianDigits: Record<string, string> = {
  '0': '۰',
  '1': '۱',
  '2': '۲', 
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹'
};

/**
 * Convert Persian digits to English digits
 * Used for storing/processing numeric values
 */
export function persianToEnglish(str: string): string {
  if (!str) return str;
  
  return str.replace(/[۰-۹]/g, (match) => persianToEnglishDigits[match] || match);
}

/**
 * Convert English digits to Persian digits
 * Used for displaying numbers to users
 */
export function englishToPersian(str: string): string {
  if (!str) return str;
  
  return str.replace(/[0-9]/g, (match) => englishToPersianDigits[match] || match);
}

/**
 * Format a number string for display (convert to Persian)
 */
export function formatNumberForDisplay(value: string | number): string {
  const stringValue = typeof value === 'number' ? value.toString() : value;
  return englishToPersian(stringValue);
}

/**
 * Parse a number string for processing (convert to English)
 */
export function parseNumberForProcessing(value: string): string {
  return persianToEnglish(value);
}

/**
 * Check if a string contains only digits (Persian or English)
 */
export function isNumericString(str: string): boolean {
  const englishDigits = persianToEnglish(str);
  return /^\d*$/.test(englishDigits);
}

/**
 * Clean phone number
 * Converts Persian digits to English and removes non-digit characters
 * Adds 0 prefix if needed for Iranian mobile numbers
 */
export function cleanPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  // Convert Persian digits to English
  const englishDigits = persianToEnglish(phoneNumber);
  
  // Remove all non-digit characters
  const cleanedNumber = englishDigits.replace(/\D/g, '');
  
  // Auto-add 0 if number starts with 9 and is 10 digits (common input pattern)
  if (cleanedNumber.length === 10 && cleanedNumber.startsWith('9')) {
    return '0' + cleanedNumber;
  }
  
  // Return cleaned number as-is
  return cleanedNumber;
}

/**
 * Format phone number for display with Persian digits
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = cleanPhoneNumber(phoneNumber);
  return englishToPersian(cleaned);
}