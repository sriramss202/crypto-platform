import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 px-6 py-4.5 text-sm text-gray-400 backdrop-blur-md">
      <span className="font-medium text-gray-300">
        Page <span className="text-cyan-400 font-bold">{page}</span> of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-gray-300"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-gray-300"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

