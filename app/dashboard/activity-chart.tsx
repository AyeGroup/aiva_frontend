import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'دی', value: 12 },
  { name: 'بهمن', value: 8 },
  { name: 'اسفند', value: 15 },
  { name: 'فروردین', value: 22 },
  { name: 'اردیبهشت', value: 18 },
  { name: 'خرداد', value: 28 },
  { name: 'تیر', value: 32 }
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-bg-surface border border-border-soft p-3 shadow-md"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        <p className="text-grey-900 font-medium">{label}</p>
        <p className="text-brand-tertiary">
          <span className="ltr">{payload[0].value}k</span> بازدید
        </p>
      </div>
    );
  }
  return null;
}

export function ActivityChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 12, 
              fill: 'var(--grey-500)',
              fontFamily: 'inherit'
            }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 12, 
              fill: 'var(--grey-500)',
              fontFamily: 'inherit'
            }}
            tickFormatter={(value) => `${value}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="var(--brand-tertiary)"
            strokeWidth={3}
            dot={{ 
              fill: 'var(--brand-tertiary)', 
              strokeWidth: 0, 
              r: 5 
            }}
            activeDot={{ 
              r: 7, 
              fill: 'var(--brand-tertiary)',
              strokeWidth: 0
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}