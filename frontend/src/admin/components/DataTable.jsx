import { useMemo, useState } from "react";
import { ArrowDownUp, Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import ConfirmModal from "./ConfirmModal";

export default function DataTable({ columns, rows, search, status, entityName }) {
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [confirming, setConfirming] = useState(null);
  const filteredRows = useMemo(() => rows.filter((row) => {
    const matchesSearch = Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (status === "All" || row.status === status);
  }).sort((a, b) => !sort ? 0 : String(a[sort]).localeCompare(String(b[sort]))), [rows, search, status, sort]);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  return <>
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-sm">
      <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-gray-500"><tr>{columns.map((column) => <th key={column.key} className="whitespace-nowrap px-5 py-4">
        <button onClick={() => { setSort(column.key); setPage(1); }} className="inline-flex items-center gap-1 transition-colors hover:text-cyan-400">{column.label}<ArrowDownUp size={13} />
      </button>
  </th>)
  }<th className="px-5 py-4">Actions</th></tr></thead><tbody>{visibleRows.length ? visibleRows.map((row) => <tr key={row.id} className="border-b border-white/10 last:border-0 transition-colors hover:bg-white/5">{columns.map((column) => <td key={column.key} className="whitespace-nowrap px-5 py-4 text-gray-300">{column.key === "status" ? <StatusBadge status={row.status} /> : row[column.key]}</td>)}
  <td className="px-5 py-4"><div className="flex gap-1"><button title="View" className="rounded-xl p-2 text-cyan-400 transition-colors hover:bg-cyan-500/10"><Eye size={16} /></button>
  <button title="Edit" className="rounded-xl p-2 text-gray-300 transition-colors hover:bg-white/10"><Pencil size={16} /></button><button title="Delete" onClick={() => setConfirming(row)} className="rounded-xl p-2 text-rose-300 transition-colors hover:bg-rose-400/10"><Trash2 size={16} /></button></div></td></tr>) : <tr>
    <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-gray-500">No {entityName.toLowerCase()} match the current filters.</td></tr>}</tbody></table></div><Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onChange={setPage} />{confirming && <ConfirmModal title={`Delete ${entityName.slice(0, -1)}?`} description="This is a UI-only confirmation. No record will be changed until backend integration is added." onClose={() => setConfirming(null)} onConfirm={() => {}} />}</>;
}
