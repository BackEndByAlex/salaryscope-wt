const STATS = [
  {
    value: "137,000+",
    label: "Verified Records",
    icon: "database",
    color: "text-on-surface",
    accent: "bg-on-surface/20",
    glow: "shadow-[0_0_24px_rgba(255,255,255,0.06)]",
  },
  {
    value: "100+",
    label: "Covered Countries",
    icon: "public",
    color: "text-primary",
    accent: "bg-primary/30",
    glow: "shadow-[0_0_24px_rgba(129,236,255,0.12)]",
  },
  {
    value: "10,000+",
    label: "Global Companies",
    icon: "corporate_fare",
    color: "text-secondary",
    accent: "bg-secondary/30",
    glow: "shadow-[0_0_24px_rgba(195,244,0,0.12)]",
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-surface-container-low relative overflow-hidden">
      {/* Smooth fade in from page background above */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0e0e0e, transparent)" }}
      />
      {/* Smooth fade out to page background below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0e0e0e, transparent)" }}
      />

      {/* Faint grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map(({ value, label, icon, color, accent, glow }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center text-center px-12 py-8 ${
                i < STATS.length - 1
              }`}
            >
              {/* Icon */}
              <span
                className={`material-symbols-outlined text-2xl mb-4 ${color} opacity-70`}
              >
                {icon}
              </span>

              {/* Value */}
              <div
                className={`text-5xl font-black tracking-tighter mb-2 ${color}`}
              >
                {value}
              </div>

              {/* Label */}
              <div className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant mb-4">
                {label}
              </div>

              {/* Accent bar */}
              <div className={`h-0.5 w-12 rounded-full ${accent} ${glow}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
