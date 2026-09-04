import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  return <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-gray-400"><span>Page {page} of {totalPages}</span><div className="flex gap-2">
    <button aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)} className="rounded-xl bg-white/5 p-2 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400 disabled:opacity-30"><ChevronLeft size={16} /></button>
    <button aria-label="Next page" disabled={page === totalPages} onClick={() => onChange(page + 1)} className="rounded-xl bg-white/5 p-2 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400 disabled:opacity-30"><ChevronRight size={16} />
    </button></div>
    </div>;
}
