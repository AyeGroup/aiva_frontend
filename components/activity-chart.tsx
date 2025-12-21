import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
  color = "#f59e0b",
  height = 200,
  showGrid = false,
  showTooltip = true,
  className = "",
}: ActivityChartProps) {
  const chartClasses = ["activity-chart", className].filter(Boolean).join(" ");

  const maxTicks = 10;
  const interval = Math.ceil(data.length / maxTicks);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="activity-chart__tooltip">
          <p className="activity-chart__tooltip-label">{label}</p>
          <p className="activity-chart__tooltip-value">
            {payload[0].value.toLocaleString("fa-IR")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    //  <div style={{ width: "100%", height: 300 }}>
    <div className={chartClasses} style={{ height: height ?? 300 }}>
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
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f1f1f1"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
          )}

          <XAxis
            dataKey="name"
            axisLine={{ stroke: "#cccccc", strokeWidth: 1 }} // رنگ و ضخامت محور X
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#6B7280",
              fontFamily: "Vazirmatn",
            }}
            // tickFormatter={(value, index) => (index % 2 === 0 ? value : "")}
            interval={interval - 1} // فاصله بین تیک‌ها
            // interval={0}
            minTickGap={3}
            angle={-60} // زاویه مورب
            textAnchor="start" // ترازبندی مناسب برای زاویه منفی
            dy={10} // کمی پایین‌تر آوردن برچسب‌ها برای خوانایی بهتر
            dx={-5} // تنظیم افقی جزئی
          />

          <YAxis
            axisLine={{ stroke: "#cccccc", strokeWidth: 1 }} // رنگ و ضخامت محور Y
            tickLine={true}
            tick={{
              fontSize: 12,
              fill: "#6B7280",
              fontFamily: "Vazirmatn",
              dx: -8, // فاصله اعداد از محور (عدد منفی = فاصله از خط)
            }}
            tickFormatter={(value) => value.toLocaleString("fa-IR")}
            domain={[0, "dataMax + 10"]}
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
              stroke: "#ffffff",
              r: 5,
            }}
            activeDot={{
              r: 7,
              stroke: color,
              strokeWidth: 3,
              fill: "#ffffff",
            }}
            strokeLinecap="round"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
