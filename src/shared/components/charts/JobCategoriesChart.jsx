import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const TOOLTIP_STYLE = {
  backgroundColor: "#1a1919",
  border: "1px solid rgba(73,72,71,0.4)",
  borderRadius: 0,
  color: "#fff",
  fontSize: "0.75rem",
}

export default function JobCategoriesChart({ data }) {
  const categories = data?.jobCategories?.jobCategories ?? []
  const sorted = [...categories]
    .filter((c) => c.jobCount > 0)
    .sort((a, b) => b.jobCount - a.jobCount)

  return (
    <div className="bg-surface-container p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Jobs by Category</h3>
        <p className="text-on-surface-variant text-xs">
          Number of job titles per category
        </p>
      </div>
      <ResponsiveContainer
        width="100%"
        height={Math.max(260, sorted.length * 36)}
      >
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ left: 16, right: 32, top: 0, bottom: 0 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "#adaaaa", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={200}
            tick={{ fill: "#adaaaa", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={{ color: "#adaaaa" }}
            itemStyle={{ color: "#d277ff" }}
            formatter={(v) => [v, "Jobs"]}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="jobCount" radius={0} maxBarSize={18}>
            {sorted.map((_, i) => (
              <Cell key={i} fill={i % 2 === 0 ? "#d277ff" : "#d277ff66"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
