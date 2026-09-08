import { useMemo, useState } from "react";
import { ArrowDownUp, Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import ConfirmModal from "./ConfirmModal";

export default function DataTable({ columns, rows, search, status, entityName }) {
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [confirming, setConfirming] = useState(null);

  const filteredRows = useMemo(
    () =>
      rows
        .filter((row) => {
          const matchesSearch = Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase());
          return matchesSearch && (status === "All" || row.status === status);
        })
        .sort((a, b) => (!sort ? 0 : String(a[sort]).localeCompare(String(b[sort])))),
    [rows, search, status, sort]
  );

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="overflow-x-auto admin-scroll-container">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-gray-400 backdrop-blur-md">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="whitespace-nowrap px-6 py-4.5 font-bold">
                  <button
                    onClick={() => {
                      setSort(column.key);
                      setPage(1);
                    }}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-400"
                  >
                    {column.label}
                    <ArrowDownUp size={13} className="text-cyan-400/70" />
                  </button>
                </th>
              ))}
              <th className="px-6 py-4.5 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <tr
                  key={row.id}
                  className="group border-b border-white/5 bg-transparent transition-all duration-300 hover:bg-cyan-500/[0.06] hover:backdrop-blur-lg"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="whitespace-nowrap px-6 py-4 font-medium text-gray-300">
                      {column.key === "status" ? <StatusBadge status={row.status} /> : row[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        title="View"
                        className="rounded-xl border border-transparent p-2 text-cyan-400 transition-all duration-200 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        title="Edit"
                        className="rounded-xl border border-transparent p-2 text-gray-300 transition-all duration-200 hover:border-white/10 hover:bg-white/10"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => setConfirming(row)}
                        className="rounded-xl border border-transparent p-2 text-rose-400 transition-all duration-200 hover:border-rose-500/30 hover:bg-rose-500/10 hover:shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-14 text-center text-gray-400 font-medium">
                  No {entityName.toLowerCase()} match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onChange={setPage} />

      {confirming && (
        <ConfirmModal
          title={`Delete ${entityName.slice(0, -1)}?`}
          description="This is a UI-only confirmation. No record will be changed until backend integration is added."
          onClose={() => setConfirming(null)}
          onConfirm={() => {}}
        />
      )}
    </>
  );
}