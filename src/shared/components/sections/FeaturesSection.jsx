import { Link } from "react-router"

// Static salary data for the topography card — representative sample from the dataset
const TOP_COUNTRIES = [
  {
    name: "United States",
    avg: 145,
    max: 220,
    color: "bg-primary",
    textColor: "text-primary",
  },
  {
    name: "Switzerland",
    avg: 128,
    max: 220,
    color: "bg-secondary",
    textColor: "text-secondary",
  },
  {
    name: "Germany",
    avg: 92,
    max: 220,
    color: "bg-primary",
    textColor: "text-primary",
  },
  {
    name: "United Kingdom",
    avg: 88,
    max: 220,
    color: "bg-primary/70",
    textColor: "text-primary/70",
  },
  {
    name: "Australia",
    avg: 83,
    max: 220,
    color: "bg-secondary/70",
    textColor: "text-secondary/70",
  },
  {
    name: "Canada",
    avg: 79,
    max: 220,
    color: "bg-primary/50",
    textColor: "text-primary/50",
  },
]

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

function TopographyCard() {
  return (
    <div className="md:col-span-2 md:row-span-2 bg-surface-container p-8 relative overflow-hidden group flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">Market Topography</h3>
            <p className="text-on-surface-variant text-sm">
              Avg. developer salary by country · USD · 2020–2025
            </p>
          </div>
          <span className="text-[0.625rem] uppercase tracking-widest font-bold text-secondary border border-secondary/20 px-2 py-1">
            Live Data
          </span>
        </div>

        {/* Bar chart */}
        <div className="space-y-3 mt-4">
          {TOP_COUNTRIES.map(({ name, avg, max, color, textColor }) => (
            <div key={name} className="flex items-center gap-3 group/row">
              <div className="w-32 text-xs text-on-surface-variant font-medium truncate shrink-0">
                {name}
              </div>
              <div className="flex-1 h-5 bg-surface-container-high rounded-none overflow-hidden">
                <div
                  className={`h-full ${color} opacity-80 group-hover/row:opacity-100 transition-all duration-500`}
                  style={{ width: `${(avg / max) * 100}%` }}
                />
              </div>
              <div
                className={`text-xs font-bold tabular-nums w-12 text-right ${textColor}`}
              >
                ${avg}k
              </div>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 ml-35 mr-13">
          {["$0", "$50k", "$100k", "$150k", "$200k+"].map((l) => (
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
        <Link to="/dashboard" className="bg-surface-variant px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-wider text-secondary hover:text-on-surface transition-colors">
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

const SCROLL_RESULTS = [
  {
    role: "Senior Software Engineer",
    location: "Berlin, DE",
    salary: "$92k",
    color: "text-primary",
  },
  {
    role: "Staff Engineer",
    location: "Munich, DE",
    salary: "$108k",
    color: "text-secondary",
  },
  {
    role: "Principal Engineer",
    location: "Zurich, CH",
    salary: "$145k",
    color: "text-primary",
  },
  {
    role: "Lead Developer",
    location: "London, UK",
    salary: "$88k",
    color: "text-on-surface",
  },
  {
    role: "Senior Backend Engineer",
    location: "Amsterdam, NL",
    salary: "$79k",
    color: "text-secondary",
  },
  {
    role: "Engineering Manager",
    location: "Berlin, DE",
    salary: "$118k",
    color: "text-primary",
  },
  {
    role: "Frontend Architect",
    location: "Hamburg, DE",
    salary: "$95k",
    color: "text-on-surface",
  },
  {
    role: "Senior Full-Stack",
    location: "Frankfurt, DE",
    salary: "$86k",
    color: "text-secondary",
  },
]

function TerminalCard() {
  return (
    <div className="bg-surface-container p-6 flex flex-col border-l-2 border-primary overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-4 shrink-0">
        <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
        <h3 className="text-xl font-bold">Direct Access</h3>
      </div>

      {/* Search input */}
      <div className="relative z-10 bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 font-mono text-xs flex items-center gap-1 mb-3 shrink-0">
        <span className="text-primary">▸</span>
        <span className="text-primary">senior engineer germany</span>
        <span className="w-1.5 h-3.5 bg-primary inline-block animate-pulse ml-0.5" />
      </div>

      {/* Scrolling results list */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-surface-container to-transparent z-10 pointer-events-none" />

        <div
          className="font-mono text-xs"
          style={{ animation: "scroll-up 20s linear infinite" }}
        >
          {[...SCROLL_RESULTS, ...SCROLL_RESULTS].map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-outline-variant/10 hover:bg-surface-container-high px-1 transition-colors cursor-pointer group"
            >
              <div className="flex flex-col min-w-0 gap-0.5">
                <span className={`font-semibold truncate ${r.color} group-hover:opacity-100 opacity-85`}>
                  {r.role}
                </span>
                <span className="text-on-surface-variant/50 text-[0.625rem]">
                  {r.location}
                </span>
              </div>
              <span className={`font-bold ml-3 shrink-0 text-sm ${r.color}`}>
                {r.salary}
              </span>
            </div>
          ))}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10 md:h-140">
          <TopographyCard />
          <FiltersCard />
          <TerminalCard />
        </div>
      </div>
    </section>
  )
}
