// Handles both raw CSV strings ("Entry-level") and normalised codes ("EN")
const EXPERIENCE_LABELS = {
  EN: "Entry", "Entry-level": "Entry",
  MI: "Mid",   "Mid-level":   "Mid",
  SE: "Senior", Senior:       "Senior",
  EX: "Executive", Executive: "Executive",
}
const EXPERIENCE_COLORS = {
  EN: "#81ecff66", "Entry-level": "#81ecff66",
  MI: "#81ecffaa", "Mid-level":   "#81ecffaa",
  SE: "#81ecff",    Senior:        "#81ecff",
  EX: "#d277ff",    Executive:     "#d277ff",
}

function formatSalary(usd) {
  if (usd == null) return "—"
  if (usd >= 1000) return `$${Math.round(usd / 1000)}k`
  return `$${usd}`
}

export default function SalaryRow({ record }) {
  const expLabel = EXPERIENCE_LABELS[record.experienceLevel] ?? record.experienceLevel
  const expColor = EXPERIENCE_COLORS[record.experienceLevel] ?? "#ffffff44"

  return (
    <div className="py-3 border-b border-outline-variant/10 last:border-0">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium leading-tight flex-1 min-w-0 truncate">
          {record.job?.title ?? "Unknown role"}
        </span>
        <span className="text-sm font-black tabular-nums text-primary shrink-0">
          {formatSalary(record.salaryInUsd)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
        <span
          className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded-sm"
          style={{ color: expColor, backgroundColor: `${expColor}22` }}
        >
          {expLabel}
        </span>
        <span className="text-[0.6rem] text-on-surface-variant/60">
          {record.workSetting}
        </span>
        <span className="text-[0.6rem] text-on-surface-variant/40">
          {record.workYear}
        </span>
      </div>
    </div>
  )
}
