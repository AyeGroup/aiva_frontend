import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import "@/styles/components.css";


export interface ActivityData {
  name: string;
  value: number;
  label?: string;
}

export interface ActivityChartProps {
  data: ActivityData[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export function ActivityChart({
  data,
  color = '#f59e0b',
  height = 200,
  showGrid = false,
  showTooltip = true,
  className = ''
}: ActivityChartProps) {
  const chartClasses = [
    'activity-chart',
    className
  ].filter(Boolean).join(' ');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="activity-chart__tooltip">
          <p className="activity-chart__tooltip-label">{label}</p>
          <p className="activity-chart__tooltip-value">
            {payload[0].value.toLocaleString('fa-IR')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={chartClasses} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 30,
          }}
        >
          {showGrid && (
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f1f1" strokeWidth="1"/>
              </pattern>
            </defs>
          )}
          
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 12, 
              fill: '#6B7280',
              fontFamily: 'Vazirmatn'
            }}
            interval={0}
            minTickGap={5}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 12, 
              fill: '#6B7280',
              fontFamily: 'Vazirmatn'
            }}
            tickFormatter={(value) => value.toLocaleString('fa-IR')}
            domain={['dataMin - 5', 'dataMax + 10']}
            width={50}
          />
          
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={3}
            dot={{ 
              fill: color, 
              strokeWidth: 3, 
              stroke: '#ffffff',
              r: 5
            }}
            activeDot={{ 
              r: 7, 
              stroke: color,
              strokeWidth: 3,
              fill: '#ffffff'
            }}
            strokeLinecap="round"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}