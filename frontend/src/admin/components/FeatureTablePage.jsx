import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import DataTable from "./DataTable";
import { useAdminGSAP } from "../hooks/useAdminGSAP";

export default function FeatureTablePage({ eyebrow, title, description, entityName, columns, rows, statusOptions }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const containerRef = useRef(null);

  // Hook GSAP stagger animations for table rows & cards
  useAdminGSAP(containerRef, `${search}-${status}`);

  return (
    <div ref={containerRef} className="mx-auto max-w-[1500px] space-y-6 sm:space-y-8">
      {/* Header Info */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            {eyebrow}
          </p>
          <h1 className="gsap-title mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">{description}</p>
        </div>
      </div>

      {/* Glass Table Section */}
      <section
        data-gsap="fade-up"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081020]/40 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar value={search} onChange={setSearch} placeholder={`Search ${entityName.toLowerCase()}...`} />
            <FilterBar value={status} onChange={setStatus} options={statusOptions} />
          </div>
          <button className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-cyan-400/40 bg-cyan-500/20 px-5 py-3 text-sm font-bold text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-105 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95">
            <Plus size={18} /> Add {entityName.slice(0, -1)}
          </button>
        </div>
        <DataTable columns={columns} rows={rows} search={search} status={status} entityName={entityName} />
      </section>
    </div>
  );
}

