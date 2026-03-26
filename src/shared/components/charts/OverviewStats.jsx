const STATS = [
  {
    label: "Salary Records",
    icon: "database",
    valueKey: "records",
    color: "text-on-surface",
  },
  {
    label: "Countries",
    icon: "public",
    valueKey: "countries",
    color: "text-primary",
  },
  {
    label: "Companies",
    icon: "corporate_fare",
    valueKey: "companies",
    color: "text-secondary",
  },
  {
    label: "Job Categories",
    icon: "work",
    valueKey: "categories",
    color: "text-tertiary",
  },
]

export default function OverviewStats({ data }) {
  const values = {
    records: data?.salaryRecords?.totalCount,
    countries: data?.countries?.totalCount,
    companies: data?.companies?.totalCount,
    categories: data?.jobCategories?.totalCount,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/10">
      {STATS.map(({ label, icon, valueKey, color }) => (
        <div
          key={label}
          className="bg-surface-container p-6 flex flex-col gap-3"
        >
          <span
            className={`material-symbols-outlined text-2xl ${color} opacity-70`}
          >
            {icon}
          </span>
          <div className={`text-4xl font-black tracking-tighter ${color}`}>
            {values[valueKey] != null ? (
              values[valueKey].toLocaleString()
            ) : (
              <span className="text-on-surface-variant/30 text-2xl">—</span>
            )}
          </div>
          <div className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
