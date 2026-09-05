import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, ShieldCheck, Award } from "lucide-react";
import { getCurrentUser } from "../utils/auth";
import Avatar from "../components/Common/Avatar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <Avatar user={user} size="lg" />
        <div>
          <h1 className="text-3xl font-bold text-white">
            {user.displayName || "Your Profile"}
          </h1>
          <p className="mt-1 text-gray-400">Manage your BitPal Trade account credentials.</p>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#101827] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Mail size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</span>
              <p className="mt-0.5 text-base font-semibold text-white truncate">{user.email}</p>
            </div>
          </div>

          {/* Phone field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#101827] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Phone size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</span>
              <p className="mt-0.5 text-base font-semibold text-white truncate">{user.phone || "N/A"}</p>
            </div>
          </div>

          {/* Created At field */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#101827] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Calendar size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Member Since</span>
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
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#101827] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00e699]/10 text-[#00e699]">
              <ShieldCheck size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Account Status</span>
              <p className="mt-0.5 text-base font-semibold text-[#00e699] flex items-center gap-1.5">
                Verified Account
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification / Badges info card */}
      <div className="rounded-3xl border border-[#00e699]/20 bg-[#08111f] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00e699]/10 text-[#00e699]">
            <Award size={26} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gamification Badges</h3>
            <p className="text-sm text-gray-400 mt-0.5">View your unlocked badges and current epoch progression.</p>
          </div>
        </div>
        <button
          onClick={() => window.location.hash = "/app/rewords"}
          className="w-full sm:w-auto shrink-0 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:scale-105 hover:bg-cyan-400 transition duration-300"
        >
          Check Badges
        </button>
      </div>
    </div>
  );
}

export default Profile;
