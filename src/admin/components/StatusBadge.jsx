const styles = {
  Active: "bg-green-500/10 text-green-400",
  Completed: "bg-green-500/10 text-green-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Inactive: "bg-white/5 text-gray-400",
};

export default function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.Inactive}`}>{status}</span>;
}
