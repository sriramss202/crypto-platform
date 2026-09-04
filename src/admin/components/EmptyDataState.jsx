import { DatabaseZap } from "lucide-react";

export default function EmptyDataState({ title, description, compact = false }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-center ${compact ? "p-6" : "p-10 sm:p-14"}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><DatabaseZap size={21} /></div>
      <h2 className="mt-4 text-base font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
