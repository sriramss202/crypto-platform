import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ title, description, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-cyan-500/30 bg-[#070e1c]/80 p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-3 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
            <AlertTriangle size={22} />
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-white tracking-tight">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-300">{description}</p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-2xl border border-rose-500/40 bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all hover:scale-105 hover:bg-rose-400 active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

