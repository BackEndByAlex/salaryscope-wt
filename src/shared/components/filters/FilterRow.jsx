export default function FilterRow({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors group"
      style={{
        background: active ? "rgba(37,99,235,0.12)" : "transparent",
        borderLeft: active ? "2px solid #2563eb" : "2px solid transparent",
      }}
    >
      <span
        className="shrink-0 w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors"
        style={{
          background: active ? "#2563eb" : "transparent",
          border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {active && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className="text-xs transition-colors"
        style={{
          color: active ? "#ffffff" : "rgba(173,170,170,0.8)",
          fontWeight: active ? 500 : 400,
        }}
      >
        {label}
      </span>
    </button>
  )
}
