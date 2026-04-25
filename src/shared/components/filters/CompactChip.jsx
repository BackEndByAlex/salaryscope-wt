export default function CompactChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs rounded-sm transition-colors"
      style={{
        background: active ? "#2563eb" : "transparent",
        border: active
          ? "1px solid transparent"
          : "1px solid rgba(255,255,255,0.1)",
        color: active ? "#ffffff" : "rgba(173,170,170,0.8)",
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </button>
  )
}
