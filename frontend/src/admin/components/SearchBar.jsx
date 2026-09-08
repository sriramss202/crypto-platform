import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <label className="relative block w-full max-w-md">
      <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
      />
    </label>
  );
}

