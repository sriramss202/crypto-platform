import { Filter } from "lucide-react";

export default function FilterBar({ value, onChange, options = ["All", "Active", "Pending", "Inactive"] }) {
  return (
    <label className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 backdrop-blur-md transition-all focus-within:border-cyan-400/50">
      <Filter size={16} className="text-cyan-400" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer [&>option]:bg-[#070d1c] [&>option]:text-gray-200"
      >
        <option value="All">All statuses</option>
        {options
          .filter((option) => option !== "All")
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </label>
  );
}

