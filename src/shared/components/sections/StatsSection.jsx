const STATS = [
  { value: "137,000+", label: "Verified Records", color: "text-on-surface" },
  { value: "100+", label: "Covered Countries", color: "text-secondary" },
  { value: "10,000+", label: "Global Companies", color: "text-primary" },
]

export default function StatsSection() {
  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {STATS.map(({ value, label, color }) => (
          <div key={label} className="space-y-2">
            <div className={`text-5xl font-black tracking-tighter ${color}`}>
              {value}
            </div>
            <div className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
