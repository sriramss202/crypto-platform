import { Filter } from "lucide-react";

export default function FilterBar({ value, onChange, options = ["All", "Active", "Pending", "Inactive"] }) {
  return <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-gray-400"><Filter size={16} /><select value={value} onChange={(event) => onChange(event.target.value)} className="bg-[#050816] text-sm text-gray-300 outline-none"><option value="All">All statuses</option>{options.filter((option) => option !== "All").map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
