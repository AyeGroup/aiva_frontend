import { convertNumbersToPersian, convertToPersian } from "@/utils/common";
import React from "react";

export interface StatCardProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;

  bgColor?: string;
  textColor?: string;
  progressColor?: string;

  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon,

  bgColor = "bg-grey-100",
  textColor = "text-grey-900",
  progressColor = "bg-primary",

  onClick,
  className = "",
}) => {
  return (
    <div className={`bg-white relative rounded-[20px] ${className}`}>
      <div
        className="overflow-clip rounded-[inherit] size-full cursor-pointer"
        onClick={onClick}
      >
        <div className="p-6 flex flex-col gap-8 w-full">
          {/* Header */}
          <div className="flex gap-4 items-center w-full">
            <div
              className={`${bgColor} rounded-2xl size-14 flex items-center justify-center`}
            >
              <div className={`w-7 h-7 ${textColor}`}>{icon}</div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p className="text-grey-600">{title}</p>
              <p className={textColor} >
                {convertToPersian(count)}
              </p>
            </div>
          </div>

          {/* Progress (Full) */}
          <div className="bg-grey-100 h-1 overflow-hidden rounded-full w-full">
            <div className={`${progressColor} h-full w-full rounded-full`} />
          </div>
        </div>
      </div>

      {/* Border */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-[20px]
        border-2 border-grey-300 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
};

export default StatCard;
