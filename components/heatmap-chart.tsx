import React from 'react';
import "@/styles/components.css";


interface HeatmapData {
  day: number; // 0-6 (Sun-Sat)
  hour: number; // 7-21
  value: number; // usage intensity 0-100
}

interface HeatmapChartProps {
  title?: string;
  subtitle?: string;
}

const DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7-21

// Mock data - realistic usage patterns
const generateMockData = (): HeatmapData[] => {
  const data: HeatmapData[] = [];
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 7; hour <= 21; hour++) {
      let value = 0;
      
      // Business hours pattern (9-17)
      if (hour >= 9 && hour <= 17) {
        value = Math.random() * 70 + 30; // 30-100
      }
      // Evening hours (18-21)
      else if (hour >= 18 && hour <= 21) {
        value = Math.random() * 50 + 15; // 15-65
      }
      // Early morning (7-8)
      else {
        value = Math.random() * 25 + 5; // 5-30
      }
      
      // Weekend adjustment
      if (day === 5 || day === 6) {
        value *= 0.7;
      }
      
      data.push({
        day,
        hour,
        value: Math.round(value)
      });
    }
  }
  
  return data;
};

const getIntensityClass = (value: number): string => {
  if (value >= 70) return 'intensity-very-high';
  if (value >= 50) return 'intensity-high';
  if (value >= 30) return 'intensity-medium';
  if (value >= 10) return 'intensity-low';
  return 'intensity-very-low';
};

// Helper function to convert English numbers to Persian
const toPersianNumber = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export function HeatmapChart({ 
  title = "ساعات فعالیت چت بات", 
  subtitle = "توزیع حجم گفتگوها در ساعات مختلف هفته"
}: HeatmapChartProps) {
  const data = generateMockData();
  const maxValue = Math.max(...data.map(d => d.value));
  const totalConversations = data.reduce((sum, d) => sum + d.value, 0);
  const avgPerDay = Math.round(totalConversations / 7);
  
  // Find peak hour
  const hourlyTotals = HOURS.map(hour => ({
    hour,
    total: data.filter(d => d.hour === hour).reduce((sum, d) => sum + d.value, 0)
  }));
  const peakHour = hourlyTotals.reduce((max, current) => 
    current.total > max.total ? current : max
  );
  
  return (
    <div 
      className="w-full bg-white border border-grey-200 shadow-card"
      style={{
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}
    >
      {title && (
        <div className="text-right mb-6">
          <h3 className="text-grey-900 mb-1" style={{ fontSize: '18px', fontWeight: '600' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-grey-600" style={{ fontSize: '13px', lineHeight: '1.4' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div 
        className="flex flex-col mb-5"
        style={{ gap: '3px', fontSize: '11px' }}
      >
        {/* Hours header */}
        <div 
          className="flex items-center mb-1"
          style={{ gap: '2px' }}
        >
          <div 
            className="flex-shrink-0"
            style={{ width: '70px', height: '22px' }}
          ></div>
          {HOURS.map((hour) => (
            <div 
              key={hour}
              className="flex items-center justify-center text-grey-500"
              style={{
                width: '22px',
                height: '22px',
                fontSize: '10px',
                fontWeight: '500'
              }}
              title={`ساعت ${hour}:00`}
            >
              {hour % 3 === 1 ? hour : ''}
            </div>
          ))}
        </div>
        
        {/* Days grid */}
        {DAYS.map((day, dayIndex) => (
          <div 
            key={dayIndex} 
            className="flex items-center"
            style={{ gap: '2px' }}
          >
            <div 
              className="flex items-center justify-end text-grey-700 flex-shrink-0 pr-2 text-right"
              style={{
                width: '55px',
                height: '22px',
                fontSize: '11px',
                fontWeight: '500'
              }}
            >
              {day}
            </div>
            <div 
              className="flex"
              style={{ gap: '2px' }}
            >
              {HOURS.map((hour) => {
                const cellData = data.find(d => d.day === dayIndex && d.hour === hour);
                const value = cellData?.value || 0;
                
                // رنگ‌بندی از دیزاین سیستم - Turquoise تا Peach
                let bgColor, borderColor;
                
                if (value <= 15) {
                  bgColor = '#E8FAFA'; // turquoise-1
                  borderColor = '#CCF4F4'; // turquoise-2
                } else if (value <= 30) {
                  bgColor = '#B0EEEE'; // turquoise-3
                  borderColor = '#94E8E8'; // turquoise-4
                } else if (value <= 45) {
                  bgColor = '#78E2E2'; // turquoise-5
                  borderColor = '#4CC3C3'; // turquoise-6
                } else if (value <= 60) {
                  bgColor = '#F1B196'; // peach-4
                  borderColor = '#EE9E7C'; // peach-5
                } else if (value <= 75) {
                  bgColor = '#E9936E'; // peach-6
                  borderColor = '#D6785B'; // peach-7
                } else {
                  bgColor = '#C35E49'; // peach-8
                  borderColor = '#A94B3B'; // peach-9
                }
                
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className="cursor-pointer transition-all duration-150 hover:z-10"
                    style={{
                      width: '22px',
                      height: '22px',
                      backgroundColor: bgColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2)';
                      e.currentTarget.style.borderRadius = '4px';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.zIndex = '10';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderRadius = '3px';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = borderColor;
                      e.currentTarget.style.zIndex = '1';
                    }}
                    title={`${day} - ${hour}:00 - ${value} گفتگو`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div 
        className="flex items-center justify-center mb-4"
        style={{
          gap: '12px',
          padding: '12px',
          background: 'rgba(101, 188, 182, 0.04)',
          borderRadius: '12px',
          border: '1px solid rgba(101, 188, 182, 0.08)'
        }}
      >
        <span className="text-grey-600" style={{ fontSize: '11px', fontWeight: '500' }}>
          کم
        </span>
        <div className="flex" style={{ gap: '3px' }}>
          {[
            { bg: '#E8FAFA', border: '#CCF4F4' },    // turquoise-1/2 - خیلی کم
            { bg: '#B0EEEE', border: '#94E8E8' },    // turquoise-3/4 - کم
            { bg: '#78E2E2', border: '#4CC3C3' },     // turquoise-5/6 - متوسط
            { bg: '#F1B196', border: '#EE9E7C' },     // peach-4/5 - زیاد
            { bg: '#D6785B', border: '#C35E49' }      // peach-7/8 - خیلی زیاد
          ].map((color, i) => (
            <div 
              key={i} 
              className="transition-transform duration-150 hover:scale-120"
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: color.bg,
                border: `1px solid ${color.border}`,
                borderRadius: '3px'
              }}
            />
          ))}
        </div>
        <span className="text-grey-600" style={{ fontSize: '11px', fontWeight: '500' }}>
          زیاد
        </span>
      </div>
      
      {/* Stats */}
      <div 
        className="flex justify-around"
        style={{
          padding: '16px',
          background: 'rgba(255, 161, 142, 0.04)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 161, 142, 0.08)'
        }}
      >
        <div className="text-center flex flex-col" style={{ gap: '2px' }}>
          <span 
            className="text-grey-600"
            style={{ fontSize: '10px', fontWeight: '500' }}
          >
            پیک استفاده
          </span>
          <span 
            style={{ 
              fontSize: '14px', 
              color: '#0A0A0A', 
              fontWeight: '700',
              direction: 'ltr'
            }}
          >
            {toPersianNumber(peakHour.hour)}:۰۰
          </span>
        </div>
        <div className="text-center flex flex-col" style={{ gap: '2px' }}>
          <span 
            className="text-grey-600"
            style={{ fontSize: '10px', fontWeight: '500' }}
          >
            فعال ترین روز
          </span>
          <span 
            style={{ 
              fontSize: '14px', 
              color: '#0A0A0A', 
              fontWeight: '700',
              direction: 'rtl'
            }}
          >
            سه‌شنبه
          </span>
        </div>
      </div>
    </div>
  );
}