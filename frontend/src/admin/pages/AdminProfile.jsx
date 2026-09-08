import { useRef } from "react";
import { Mail, ShieldCheck, UserRound, Sparkles } from "lucide-react";
import { useAdminGSAP } from "../hooks/useAdminGSAP";

export default function AdminProfile() {
  const containerRef = useRef(null);

  // Hook GSAP stagger animations
  useAdminGSAP(containerRef);

  return (
    <div ref={containerRef} className="max-w-4xl space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          Account Operations
        </p>
        <h1 className="gsap-title mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Admin Profile
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Administrator credentials and security profile overview.
        </p>
      </div>

      <section
        data-gsap="fade-up"
        className="rounded-3xl border border-white/10 bg-[#081020]/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
            <UserRound size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">System Administrator</h2>
              <span className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-xs font-semibold text-cyan-300">
                <Sparkles size={12} /> Active
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-400">Operations preview account</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Mail size={18} />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</p>
            <p className="mt-1 text-sm font-semibold text-gray-200">admin@bitpal.internal</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <ShieldCheck size={18} />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">Access Level</p>
            <p className="mt-1 text-sm font-semibold text-gray-200">Super Administrator (Full Privileges)</p>
          </div>
        </div>
      </section>
    </div>
  );
}

