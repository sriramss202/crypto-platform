import { useState } from "react";
import {
  Compass,
  TrendingUp,
  Shield,
  Target,
  Layers,
  Crown,
  Sparkles,
  Activity,
  Trophy,
  Award
} from "lucide-react";

const TIER_CONFIG = {
  1: { icon: Compass,    color: "#00e699", bgGrad: "from-[#00e699]/20 to-[#041a14]" },
  2: { icon: TrendingUp, color: "#10b981", bgGrad: "from-[#10b981]/20 to-[#041812]" },
  3: { icon: Shield,     color: "#f59e0b", bgGrad: "from-[#f59e0b]/20 to-[#1c1204]" },
  4: { icon: Target,     color: "#8b5cf6", bgGrad: "from-[#8b5cf6]/20 to-[#120a24]" },
  5: { icon: Layers,     color: "#3b82f6", bgGrad: "from-[#3b82f6]/20 to-[#061024]" },
  6: { icon: Crown,      color: "#eab308", bgGrad: "from-[#eab308]/20 to-[#1a1504]" },
  7: { icon: Sparkles,   color: "#ef4444", bgGrad: "from-[#ef4444]/20 to-[#1c0808]" },
  8: { icon: Activity,   color: "#06b6d4", bgGrad: "from-[#06b6d4]/20 to-[#04141a]" },
  9: { icon: Trophy,     color: "#10b981", bgGrad: "from-[#10b981]/20 to-[#041a14]" },
};

export default function BadgeGraphic({ badge, size = "md", className = "" }) {
  // imgError tracks if the CDN image fails to load; default false so image always tries first
  const [imgError, setImgError] = useState(false);

  const config = TIER_CONFIG[badge?.id] || TIER_CONFIG[1];
  const IconComponent = config.icon || Award;

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
    xl: "w-40 h-40",
  }[size] || "w-20 h-20";

  const iconSize = {
    sm: 18,
    md: 30,
    lg: 42,
    xl: 60,
  }[size] || 30;

  const isCurrent  = badge?.status === "current";
  const isCompleted = badge?.status === "completed";

  // --- Always render the <img> tag when a URL is present and no load error ---
  const showImage = badge?.image && !imgError;

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {showImage ? (
        /* PRIMARY: Real badge image from CDN */
        <img
          src={badge.image}
          alt={`${badge.name} Badge`}
          onError={() => setImgError(true)}
          className={`${sizeClasses} object-contain transition-transform duration-300 hover:scale-105`}
          style={{
            filter: isCurrent
              ? "drop-shadow(0 0 16px rgba(0,230,153,0.6))"
              : isCompleted
              ? "drop-shadow(0 0 10px rgba(16,185,129,0.4))"
              : "grayscale(60%) drop-shadow(0 0 4px rgba(255,255,255,0.05))",
          }}
        />
      ) : (
        /* FALLBACK: Icon-based hexagonal badge (shown only when image URL is missing or broken) */
        <div
          className={`relative ${sizeClasses} rounded-2xl bg-gradient-to-b ${config.bgGrad} border p-3 flex items-center justify-center backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-105`}
          style={{
            borderColor: isCurrent ? config.color : isCompleted ? `${config.color}99` : "#1e293b",
            boxShadow:   isCurrent ? `0 0 25px ${config.color}40` : "none",
          }}
        >
          {/* Hexagonal Inner Ring */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <polygon
              points="50 4, 93 25, 93 75, 50 96, 7 75, 7 25"
              fill="none"
              stroke={config.color}
              strokeWidth="2"
              strokeDasharray={isCurrent ? "4 2" : "none"}
            />
          </svg>

          {/* Icon */}
          <div
            className="relative z-10 flex items-center justify-center"
            style={{ color: isCurrent || isCompleted ? config.color : "#64748b" }}
          >
            {badge?.id === 7 ? (
              <Sparkles size={iconSize} strokeWidth={1.8} className="animate-pulse" />
            ) : (
              <IconComponent size={iconSize} strokeWidth={1.8} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
