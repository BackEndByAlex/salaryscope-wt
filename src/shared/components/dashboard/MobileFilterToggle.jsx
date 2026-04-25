export default function MobileFilterToggle({ onClick, activeCount }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full shadow-lg bg-surface-container border border-outline-variant/30 text-on-surface"
    >
      <span className="material-symbols-outlined text-sm">tune</span>
      Filters
      {activeCount > 0 && (
        <span
          className="text-[0.6rem] font-black px-1.5 py-0.5 rounded-sm"
          style={{ background: "#2563eb", color: "#ffffff" }}
        >
          {activeCount}
        </span>
      )}
    </button>
  )
}
