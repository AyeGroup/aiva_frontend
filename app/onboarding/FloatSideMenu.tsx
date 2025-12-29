"use client";

import { useEffect, useState } from "react";
import { getPlanIcon } from "@/constants/plans";
import { StatsDrawer } from "../dashboard/widgets/stats-drawer";
import { BotConfig } from "@/types/common";
import { toast } from "sonner";
// import { usePricing } from "@/providers/PricingContext";

export default function FloatSideMenu({ activePlan }: { activePlan: string }) {
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("BASIC");
  const [selectedBot, setSelectedBot] = useState<BotConfig | null>(null);
  // const { currentPlan } = usePricing();
  // console.log("currentPlan", currentPlan);
  // console.log("activePlan", activePlan);
  const menuItems = [
    { icon: getPlanIcon("FREE"), label: "آغازین", key: "FREE" },
    { icon: getPlanIcon("BASIC"), label: "پایه", key: "BASIC" },
    { icon: getPlanIcon("MEDIUM"), label: "حرفه‌ای", key: "MEDIUM" },
    { icon: getPlanIcon("ADVANCE"), label: "پیشرفته", key: "ADVANCE" },
    { icon: getPlanIcon("ENTERPRISE"), label: "ویژه", key: "ENTERPRISE" },
  ];

  const handleGetBot = () => {

    const stored = localStorage.getItem("aiva-onboarding-data");
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      console.log("2", parsed?.botConfig);
      if (parsed?.botConfig) {
        return(parsed.botConfig as BotConfig);
      } else {
        return(null);
      }
    } catch (err) {
      console.error("Invalid aiva-onboarding-data in localStorage", err);
      return(null);
    }
  } 

  const handleClick = (planKey: string) => {
    console.log("ali selectedBot : ", selectedBot);
   const mybot= handleGetBot();
    if (!mybot || !mybot.uuid) {
      toast.warning(
        "ابتدا چت‌بات را ایجاد کنید سپس می‌توانید پلن خریداری کنید"
      );
      return;
    }
    setSelectedBot(mybot);
    // localStorage.setItem("selectedBot", JSON.stringify(selectedBot));
    setSelectedPlan(planKey);
    setIsStatsDrawerOpen(true);
  };

  return (
    <>
      {/* FLOAT MENU */}
      <div className="fixed left-0 top-40 -translate-y-1/2 z-30">
        <div className="group flex flex-col gap-2 bg-white/40 backdrop-blur-md shadow-lg border-r border-gray-200 rounded-r-xl p-1">
          {menuItems.map((item, index) => {
            const active = activePlan === item.key;
            // const active = currentPlan === item.key;

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
        chatbot={selectedBot}
      />
    </>
  );
}
