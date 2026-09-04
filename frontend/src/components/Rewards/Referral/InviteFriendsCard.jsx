import { Copy, Share2 } from "lucide-react";

export default function InviteFriendsCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d1e]/80 backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,230,153,0.05)] transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/90">Invite Friends</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Share your referral link</h2>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1221] p-5 text-white shadow-inner shadow-black/10">
        <p className="text-sm text-gray-400">Your referral link</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="break-all rounded-2xl border border-white/10 bg-[#0c1424] px-4 py-3 text-sm text-cyan-100">
            https://epoch.exchange/r/crypto24
          </span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
              <Copy size={16} /> Copy Link
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:bg-white/10">
              <Share2 size={16} /> Share Now & Earn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
