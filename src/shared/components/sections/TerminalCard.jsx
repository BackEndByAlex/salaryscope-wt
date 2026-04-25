const SCROLL_COLORS = ["text-primary", "text-secondary", "text-on-surface"]

function fmtSalary(usd) {
  if (!usd) return null
  return `$${Math.round(usd / 1000)}k`
}

export default function TerminalCard({ records }) {
  const items = [...records]
    .filter((r) => r.salaryInUsd)
    .sort((a, b) => b.salaryInUsd - a.salaryInUsd)
    .slice(0, 16)

  const doubled = [...items, ...items]

  return (
    <div className="bg-surface-container p-6 flex flex-col border-l-2 border-primary overflow-hidden relative h-80 md:h-auto">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3 mb-4 shrink-0">
        <span className="material-symbols-outlined text-primary text-2xl">
          terminal
        </span>
        <h3 className="text-xl font-bold">Direct Access</h3>
      </div>

      <div className="relative z-10 bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 font-mono text-xs flex items-center gap-1 mb-3 shrink-0">
        <span className="text-primary">▸</span>
        <span className="text-primary">top paying roles · all countries</span>
        <span className="w-1.5 h-3.5 bg-primary inline-block animate-pulse ml-0.5" />
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-surface-container to-transparent z-10 pointer-events-none" />
        <div
          className="font-mono text-xs"
          style={{ animation: "scroll-up 20s linear infinite" }}
        >
          {doubled.map((r, i) => {
            const color = SCROLL_COLORS[i % SCROLL_COLORS.length]
            return (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-outline-variant/10 hover:bg-surface-container-high px-1 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col min-w-0 gap-0.5">
                  <span
                    className={`font-semibold truncate ${color} group-hover:opacity-100 opacity-85`}
                  >
                    {r.job.title}
                  </span>
                  <span className="text-on-surface-variant/50 text-[0.625rem]">
                    {r.employeeCountry?.name ?? "—"}
                  </span>
                </div>
                <span className={`font-bold ml-3 shrink-0 text-sm ${color}`}>
                  {fmtSalary(r.salaryInUsd)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  )
}
