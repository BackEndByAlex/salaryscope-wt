import { Link } from "react-router"

const BAR_COLORS = [
  { bar: "bg-primary", text: "text-primary" },
  { bar: "bg-secondary", text: "text-secondary" },
  { bar: "bg-primary", text: "text-primary" },
  { bar: "bg-primary/70", text: "text-primary/70" },
  { bar: "bg-secondary/70", text: "text-secondary/70" },
  { bar: "bg-primary/50", text: "text-primary/50" },
]

function fmtCount(n) {
  if (n >= 1000) return `${Math.round(n / 1000)}k`
  return `${n}`
}

export default function TopographyCard({ countries }) {
  const sorted = [...countries]
    .filter((c) => c.employeeRecordCount > 0)
    .sort((a, b) => b.employeeRecordCount - a.employeeRecordCount)
    .slice(0, 6)

  const max = sorted[0]?.employeeRecordCount ?? 1

  return (
    <div className="md:col-span-2 md:row-span-2 bg-surface-container p-8 relative overflow-hidden group flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">Market Topography</h3>
            <p className="text-on-surface-variant text-sm">
              Top countries by salary records · 2020–2025
            </p>
          </div>
          <span className="text-[0.625rem] uppercase tracking-widest font-bold text-secondary border border-secondary/20 px-2 py-1">
            Live Data
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {sorted.map(({ name, employeeRecordCount }, i) => {
            const { bar, text } =
              BAR_COLORS[i] ?? BAR_COLORS[BAR_COLORS.length - 1]
            return (
              <div key={name} className="flex items-center gap-3 group/row">
                <div className="w-32 text-xs text-on-surface-variant font-medium truncate shrink-0">
                  {name}
                </div>
                <div className="flex-1 h-5 bg-surface-container-high overflow-hidden">
                  <div
                    className={`h-full ${bar} opacity-80 group-hover/row:opacity-100 transition-all duration-500`}
                    style={{ width: `${(employeeRecordCount / max) * 100}%` }}
                  />
                </div>
                <div
                  className={`text-xs font-bold tabular-nums w-12 text-right ${text}`}
                >
                  {fmtCount(employeeRecordCount)}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between mt-2 ml-35 mr-13">
          {["0", "20k", "40k", "60k", "80k+"].map((l) => (
            <span
              key={l}
              className="text-[0.5625rem] text-on-surface-variant/40 font-medium"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <Link
          to="/dashboard"
          className="bg-surface-variant px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-wider text-secondary hover:text-on-surface transition-colors"
        >
          Explore Map →
        </Link>
      </div>
    </div>
  )
}
