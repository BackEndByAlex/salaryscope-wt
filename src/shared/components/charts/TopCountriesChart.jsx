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

export default function TopCountriesChart({ data }) {
  const countries = data?.countries?.countries ?? []
  const sorted = [...countries]
    .filter((c) => c.employeeRecordCount > 0)
    .sort((a, b) => b.employeeRecordCount - a.employeeRecordCount)
    .slice(0, 15)

  return (
    <div className="bg-surface-container p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Top Countries by Records</h3>
        <p className="text-on-surface-variant text-xs">
          Employee salary records per country
        </p>
      </div>
      <ResponsiveContainer width="100%" height={360}>
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
            width={110}
            tick={{ fill: "#adaaaa", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={{ color: "#adaaaa" }}
            itemStyle={{ color: "#81ecff" }}
            formatter={(v) => [v.toLocaleString(), "Records"]}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="employeeRecordCount" radius={0} maxBarSize={18}>
            {sorted.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? "#81ecff" : i < 3 ? "#81ecff99" : "#81ecff44"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
