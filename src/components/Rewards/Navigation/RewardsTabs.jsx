import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sun,
  CalendarDays,
  Trophy,
  Users,
  Award,
} from "lucide-react";
import TabButton from "./TabButton";

function RewardsTabs({ activeTab, setActiveTab }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  const tabs = useMemo(
    () => [
      { label: "Daily", value: "daily", icon: Sun },
      { label: "Weekly", value: "weekly", icon: CalendarDays },
      { label: "Milestones", value: "milestones", icon: Trophy },
      { label: "Referrals", value: "referrals", icon: Users },
      { label: "Badges", value: "badges", icon: Award },
    ],
    []
  );

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
      const activeButton = tabRefs.current[activeIndex];

      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    };

    updateIndicator();
    
    // Recalculate on window resize or orientation change
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab, tabs]);

  return (
    <div className="relative flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-cyan-500/20 bg-[#060C18]/80 p-1.5 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6)] backdrop-blur-2xl scrollbar-none sm:gap-1.5 sm:rounded-full">
      
      {/* GLOWING AMBIENT BACKGROUND INDICATOR */}
      <div
        className="pointer-events-none absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-cyan-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] sm:rounded-full"
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
        }}
      >
        {/* TOP HIGHLIGHT EDGE */}
        <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-80" />
      </div>

      {/* TAB BUTTONS */}
      {tabs.map((tab, index) => (
        <TabButton
          key={tab.value}
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
          icon={tab.icon}
          label={tab.label}
          value={tab.value}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
}

export default RewardsTabs;