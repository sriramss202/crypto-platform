const styles = {
  Active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
  Completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
  Inactive: "border-white/10 bg-white/5 text-gray-400",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${
        styles[status] || styles.Inactive
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active" || status === "Completed"
            ? "bg-emerald-400 animate-pulse"
            : status === "Pending"
            ? "bg-amber-400 animate-pulse"
            : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

