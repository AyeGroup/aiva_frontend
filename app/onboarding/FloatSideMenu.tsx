"use client";

import { useState } from "react";
import { getPlanIcon } from "@/constants/plans";
import { StatsDrawer } from "../dashboard/stats-drawer";
import { usePricing } from "@/providers/PricingContext";

export default function FloatSideMenu({ activePlan }: { activePlan: string }) {
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("BASIC");
  const { currentPlan } = usePricing();
  console.log("currentPlan", currentPlan);
  console.log("activePlan", activePlan);
  const menuItems = [
    { icon: getPlanIcon("FREE"), label: "آغازین", key: "FREE" },
    { icon: getPlanIcon("BASIC"), label: "پایه", key: "BASIC" },
    { icon: getPlanIcon("MEDIUM"), label: "حرفه‌ای", key: "MEDIUM" },
    { icon: getPlanIcon("ADVANCE"), label: "پیشرفته", key: "ADVANCE" },
    { icon: getPlanIcon("ENTERPRISE"), label: "ویژه", key: "ENTERPRISE" },
  ];

  const handleClick = (planKey: string) => {
    setSelectedPlan(planKey);
    setIsStatsDrawerOpen(true);
  };

  return (
    <>
      {/* FLOAT MENU */}
      <div className="fixed left-0 top-40 -translate-y-1/2 z-50">
        <div className="group flex flex-col gap-2 bg-white/40 backdrop-blur-md shadow-lg border-r border-gray-200 rounded-r-xl p-1">
          {menuItems.map((item, index) => {
            const active = currentPlan === item.key;

            return (
              <button
                key={index}
                onClick={() => handleClick(item.key)}
                title={active ? "پلن فعال شما" : ""}
                className={`
                  flex items-center gap-4 overflow-hidden
                  transition-all duration-500 ease-in-out
                  rounded-r-lg px-2 py-2
                  ${
                    active ? "bg-secondary text-white" : "bg-primary text-white"
                  }
                  w-10 group-hover:w-36
                `}
              >
                <div
                  className={`${
                    active ? "scale-110" : "opacity-80"
                  } transition`}
                >
                  {item.icon}
                </div>

                <div
                  className={`
                    whitespace-nowrap
                    transition-opacity duration-500 ease-in-out
                    opacity-0 group-hover:opacity-100
                    ${active ? "block" : "hidden"} group-hover:block
                  `}
                >
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DRAWER */}
      <StatsDrawer
        isOpen={isStatsDrawerOpen}
        onClose={() => setIsStatsDrawerOpen(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
