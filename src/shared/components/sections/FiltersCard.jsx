const FILTER_PILLS = [
  {
    label: "Role",
    value: "Software Engineer",
    color: "text-primary border-primary/30",
  },
  {
    label: "Country",
    value: "Germany",
    color: "text-secondary border-secondary/30",
  },
  {
    label: "Experience",
    value: "Senior",
    color: "text-on-surface border-outline-variant/40",
  },
  {
    label: "Currency",
    value: "USD",
    color: "text-on-surface border-outline-variant/40",
  },
]

export default function FiltersCard() {
  return (
    <div className="bg-surface-container p-8 flex flex-col justify-between border-l-2 border-secondary overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
      <div className="space-y-4 relative z-10">
        <span className="material-symbols-outlined text-secondary text-3xl">
          tune
        </span>
        <h3 className="text-xl font-bold">Atomic Filters</h3>
        <p className="text-on-surface-variant text-xs leading-relaxed">
          Slice by experience, stack, currency, and work-setting in real-time.
        </p>
        <div className="space-y-2 pt-1">
          {FILTER_PILLS.map(({ label, value, color }) => (
            <div
              key={label}
              className={`flex items-center justify-between border px-3 py-1.5 text-xs font-medium ${color}`}
            >
              <span className="text-on-surface-variant uppercase tracking-wider text-[0.5625rem]">
                {label}
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
