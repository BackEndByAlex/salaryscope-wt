import { Link } from "react-router"
import { useQuery } from "@apollo/client/react"
import { FEATURES_QUERY } from "../../../graphql/queries/home.js"

const BAR_COLORS = [
  { bar: "bg-primary", text: "text-primary" },
  { bar: "bg-secondary", text: "text-secondary" },
  { bar: "bg-primary", text: "text-primary" },
  { bar: "bg-primary/70", text: "text-primary/70" },
  { bar: "bg-secondary/70", text: "text-secondary/70" },
  { bar: "bg-primary/50", text: "text-primary/50" },
]

const SCROLL_COLORS = ["text-primary", "text-secondary", "text-on-surface"]

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

function fmtCount(n) {
  if (n >= 1000) return `${Math.round(n / 1000)}k`
  return `${n}`
}

function fmtSalary(usd) {
  if (!usd) return null
  return `$${Math.round(usd / 1000)}k`
}

function TopographyCard({ countries }) {
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

function FiltersCard() {
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

function TerminalCard({ records }) {
  const items = [...records]
    .filter((r) => r.salaryInUsd)
    .sort((a, b) => b.salaryInUsd - a.salaryInUsd)
    .slice(0, 16)

  const doubled = [...items, ...items]

  return (
    <div className="bg-surface-container p-6 flex flex-col border-l-2 border-primary overflow-hidden relative">
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

export default function FeaturesSection() {
  const { data, loading } = useQuery(FEATURES_QUERY)

  const countries = data?.countries?.countries ?? []
  const records = data?.salaryRecords?.records ?? []

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 mb-4 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-3">
            ENGINEERED FOR PRECISION
          </h2>
          <p className="text-on-surface-variant max-w-md">
            Data visualization that goes beyond spreadsheets.
          </p>
        </div>

        {loading ? (
          <div className="h-140 bg-surface-container animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10 md:h-140">
            <TopographyCard countries={countries} />
            <FiltersCard />
            <TerminalCard records={records} />
          </div>
        )}
      </div>
    </section>
  )
}
