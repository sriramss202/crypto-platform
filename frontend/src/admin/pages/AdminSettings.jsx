import { useRef } from "react";
import { KeyRound, ShieldAlert } from "lucide-react";
import { useAdminGSAP } from "../hooks/useAdminGSAP";

export default function AdminSettings() {
  const containerRef = useRef(null);

  // Hook GSAP stagger animations
  useAdminGSAP(containerRef);

  return (
    <div ref={containerRef} className="max-w-4xl space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          Preferences & Security
        </p>
        <h1 className="gsap-title mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Admin Settings
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Security controls and session configuration options.
        </p>
      </div>

      <section
        data-gsap="fade-up"
        className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-[#081020]/40 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex gap-5 p-6 sm:p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <KeyRound size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Authentication & Security</h2>
            <p className="mt-1.5 text-sm leading-6 text-gray-300">
              Multi-factor authentication enforcement, session duration rules, and credential policies.
            </p>
          </div>
        </div>

        <div className="flex gap-5 p-6 sm:p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Preview Safeguard Active</h2>
            <p className="mt-1.5 text-sm leading-6 text-gray-300">
              This session runs in isolated local preview mode. Global configuration changes remain safe and non-persistent until live production APIs are bound.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

