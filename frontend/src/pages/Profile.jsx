import { useEffect, useState, useRef } from "react";
import { Mail, Phone, Calendar, ShieldCheck, Award, Sparkles } from "lucide-react";
import { getCurrentUser } from "../utils/auth";
import Avatar from "../components/Common/Avatar";
import { useUserGSAP } from "../hooks/useUserGSAP";

function Profile() {
  const [user, setUser] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Hook GSAP animations
  useUserGSAP(containerRef, user?.email);

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-white/10 pb-6">
        <Avatar user={user} size="lg" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-white">
              {user.displayName || "Trader Account"}
            </h1>
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-300">
              <Sparkles size={12} /> Verified
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-400">Manage your BitPal Trade security profile & credentials.</p>
        </div>
      </div>

      {/* Profile Details Card */}
      <div
        data-gsap="fade-up"
        className="rounded-3xl border border-white/10 bg-[#081020]/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Mail size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</span>
              <p className="mt-0.5 text-base font-semibold text-white truncate">{user.email}</p>
            </div>
          </div>

          {/* Phone field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Phone size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</span>
              <p className="mt-0.5 text-base font-semibold text-white truncate">{user.phone || "N/A"}</p>
            </div>
          </div>

          {/* Created At field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Calendar size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Member Since</span>
              <p className="mt-0.5 text-base font-semibold text-white truncate">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "N/A"}
              </p>
            </div>
          </div>

          {/* Status field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ShieldCheck size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Account Status</span>
              <p className="mt-0.5 text-base font-semibold text-emerald-300 flex items-center gap-1.5">
                Verified Account
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification / Badges info card */}
      <div
        data-gsap="fade-up"
        className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-600/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Award size={28} />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Gamification Badges & Progression</h3>
            <p className="text-sm text-gray-300 mt-0.5">View your unlocked badges, trading rank, and epoch milestones.</p>
          </div>
        </div>
        <button
          onClick={() => window.location.hash = "/app/rewards"}
          className="w-full sm:w-auto shrink-0 rounded-2xl border border-cyan-400/40 bg-cyan-500/20 px-6 py-3 font-bold text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-105 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition duration-300 active:scale-95"
        >
          Check Badges
        </button>
      </div>
    </div>
  );
}

export default Profile;

