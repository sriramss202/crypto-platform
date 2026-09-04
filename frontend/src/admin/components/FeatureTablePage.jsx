import { useState } from "react";
import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import DataTable from "./DataTable";

export default function FeatureTablePage({ eyebrow, title, description, entityName, columns, rows, statusOptions }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  return <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{eyebrow}</p>
  <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">{description}</p></div>
  </div><section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]">
  <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-col gap-3 sm:flex-row">
    <SearchBar value={search} onChange={setSearch} placeholder={`Search ${entityName.toLowerCase()}`} />
  <FilterBar value={status} onChange={setStatus} options={statusOptions} /></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"><Plus size={17} /> Add {entityName.slice(0, -1)}</button></div>
  <DataTable columns={columns} rows={rows} search={search} status={status} entityName={entityName} /></section>
  </div>;
}
