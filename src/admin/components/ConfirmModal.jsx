import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ title, description, onClose, onConfirm }) {
  return (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-[#08111F] p-6 shadow-2xl">
    <div className="flex items-start justify-between"><div className="rounded-2xl bg-amber-400/10 p-2.5 text-amber-300"><AlertTriangle size={20} /></div>
    <button onClick={onClose} className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"><X size={20} /></button>
    </div>
    <h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-gray-400">{description}</p><div className="mt-6 flex justify-end gap-3">
      <button onClick={onClose} className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10">Cancel</button>
  <button onClick={() => { onConfirm(); onClose(); }} className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105">Confirm</button>
  </div>
  </div>
  </div>
  );
}
