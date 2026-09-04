import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search" }) {
  return <label className="relative block w-full max-w-md"><Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-white/10 bg-[#050816] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-400" /></label>;
}
