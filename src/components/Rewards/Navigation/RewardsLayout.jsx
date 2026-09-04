import { useEffect, useState } from "react";
import RewardsTabs from "./RewardsTabs";

function RewardsLayout({ activeTab, setActiveTab, header, children, hideTabs = false }) {
  const [isContentVisible, setIsContentVisible] = useState(true);

  useEffect(() => {
    setIsContentVisible(false);
    const timeoutId = window.setTimeout(() => setIsContentVisible(true), 40);

    return () => window.clearTimeout(timeoutId);
  }, [activeTab]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        
        {/* HEADER CONTAINER */}
        {header ? (
          <div className="rounded-3xl border border-cyan-500/20 bg-[#0B132B]/80 p-5 sm:p-7 lg:p-9 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all">
            {header}
          </div>
        ) : null}

        {/* STICKY NAV TABS CONTAINER */}
        {!hideTabs && (
          <div className="sticky top-4 z-30 flex w-full justify-center sm:justify-start">
            <RewardsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB CONTENT VIEWPORT */}
        <div
          className={`transition-all duration-300 ease-out ${
            isContentVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-2 opacity-0 scale-[0.99]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default RewardsLayout;