import { useState, useRef, useCallback, useEffect } from 'react';
import "@/styles/components.css";


interface ColorWheelProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function ColorWheel({ selectedColor, onColorChange, onClose, isOpen }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Convert HSV to RGB
  const hsvToRgb = (h: number, s: number, v: number) => {
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // RGB to Hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  // Draw color wheel
  const drawColorWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = angle * Math.PI / 180;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = radius * 0.8;
      ctx.strokeStyle = hsvToRgb(angle, 1, 1);
      ctx.stroke();
    }

    // Draw inner white circle for lighter colors
    const innerRadius = radius * 0.3;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

  }, []);

  // Get color from position
  const getColorFromPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return '#65bcb6';

    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const relativeX = x - rect.left - centerX;
    const relativeY = y - rect.top - centerY;
    
    const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
    const angle = (Math.atan2(relativeY, relativeX) * 180 / Math.PI + 360) % 360;
    
    const radius = Math.min(centerX, centerY) - 10;
    const saturation = Math.min(distance / radius, 1);
    const value = 1;
    
    const color = hsvToRgb(angle, saturation, value);
    const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (match) {
      return rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
    }
    
    return '#65bcb6';
  };

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const color = getColorFromPosition(e.clientX, e.clientY);
    onColorChange(color);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const color = getColorFromPosition(e.clientX, e.clientY);
    onColorChange(color);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Predefined popular colors
  const popularColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#AED6F1', '#D7BDE2'
  ];

  useEffect(() => {
    if (isOpen) {
      drawColorWheel();
    }
  }, [isOpen, drawColorWheel]);

  if (!isOpen) return null;

  return (
    <div className="color-wheel-overlay" onClick={onClose}>
      <div className="color-wheel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="color-wheel-header">
          <h3>انتخاب رنگ</h3>
          <button onClick={onClose} className="color-wheel-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="color-wheel-content">
          <div className="color-wheel-canvas-container">
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              className="color-wheel-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            
            {/* Color preview */}
            <div className="color-wheel-preview">
              <div 
                className="color-wheel-preview-swatch"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="color-wheel-preview-text">{selectedColor}</span>
            </div>
          </div>

          {/* Popular colors */}
          <div className="color-wheel-popular">
            <h4>رنگ‌های محبوب</h4>
            <div className="color-wheel-popular-grid">
              {popularColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-wheel-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="color-wheel-actions">
            <button 
              onClick={onClose}
              className="color-wheel-cancel"
            >
              لغو
            </button>
            <button 
              onClick={onClose}
              className="color-wheel-confirm"
            >
              تأیید انتخاب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}