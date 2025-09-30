import { useState, useRef, useCallback } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  unit?: string;
  formatValue?: (value: number) => string;
  marks?: { value: number; label: string }[];
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  disabled = false,
  label,
  showValue = true,
  unit = '',
  formatValue,
  marks = []
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const formatDisplayValue = (val: number) => {
    if (formatValue) return formatValue(val);
    return `${val}${unit}`;
  };

  const updateValue = useCallback((clientX: number) => {
    if (!sliderRef.current || disabled) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = rect.width;
    const clickPosition = clientX - rect.left;
    
    // Handle RTL
    const normalizedPosition = document.dir === 'rtl' 
      ? sliderWidth - clickPosition 
      : clickPosition;
    
    const percentage = Math.max(0, Math.min(100, (normalizedPosition / sliderWidth) * 100));
    const rawValue = min + (percentage / 100) * (max - min);
    
    // Round to nearest step
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    onChange(clampedValue);
  }, [min, max, step, onChange, disabled]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    
    setIsDragging(true);
    updateValue(e.clientX);
    
    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    let newValue = value;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageUp':
        newValue = Math.min(max, value + step * 10);
        break;
      case 'PageDown':
        newValue = Math.max(min, value - step * 10);
        break;
      default:
        return;
    }
    
    e.preventDefault();
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-grey-700">
            {label}
          </label>
          {showValue && (
            <span className="text-brand-primary font-medium">
              {formatDisplayValue(value)}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        {/* Track */}
        <div
          ref={sliderRef}
          className={`
            relative h-2 bg-grey-200 rounded-full cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onMouseDown={handleMouseDown}
        >
          {/* Progress */}
          <div
            className="absolute top-0 h-full bg-brand-primary rounded-full"
            style={{ 
              width: `${percentage}%`,
              right: document.dir === 'rtl' ? `${100 - percentage}%` : 'auto',
              left: document.dir === 'rtl' ? 'auto' : '0'
            }}
          />
          
          {/* Thumb */}
          <div
            ref={thumbRef}
            className={`
              absolute top-1/2 w-6 h-6 bg-brand-primary rounded-full 
              -translate-y-1/2 cursor-grab shadow-md border-4 border-white
              focus:outline-none focus:ring-4 focus:ring-brand-primary/20
              ${isDragging ? 'cursor-grabbing scale-110' : ''}
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
            style={{ 
              right: document.dir === 'rtl' ? `calc(${100 - percentage}% - 12px)` : 'auto',
              left: document.dir === 'rtl' ? 'auto' : `calc(${percentage}% - 12px)`
            }}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={formatDisplayValue(value)}
            aria-label={label || 'Slider'}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        {/* Marks */}
        {marks.length > 0 && (
          <div className="relative mt-2">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute flex flex-col items-center"
                  style={{ 
                    right: document.dir === 'rtl' ? `calc(${100 - markPercentage}% - 8px)` : 'auto',
                    left: document.dir === 'rtl' ? 'auto' : `calc(${markPercentage}% - 8px)`
                  }}
                >
                  <div className="w-1 h-1 bg-grey-400 rounded-full mb-1" />
                  <span className="text-caption text-grey-500 whitespace-nowrap">
                    {mark.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Min/Max labels */}
      <div className="flex justify-between text-caption text-grey-500">
        <span>{formatDisplayValue(min)}</span>
        <span>{formatDisplayValue(max)}</span>
      </div>
    </div>
  );
}