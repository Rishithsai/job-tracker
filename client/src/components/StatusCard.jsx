export default function StatsCard({ label, count, color }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
        style={{ background: `${color}20`, color }}
      >
        {count}
      </div>
      <div>
        <p className="text-xs text-[#6a708a] uppercase tracking-wider font-medium">{label}</p>
        <p className="text-2xl font-display font-bold text-white">{count}</p>
      </div>
    </div>
  );
}