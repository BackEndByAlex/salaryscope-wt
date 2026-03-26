import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"

const TOOLTIP_STYLE = {
  backgroundColor: "#1a1919",
  border: "1px solid rgba(73,72,71,0.4)",
  borderRadius: 0,
  color: "#fff",
  fontSize: "0.75rem",
}

export default function TopCompaniesChart({ data }) {
  const companies = data?.companies?.companies ?? []
  const sorted = [...companies]
    .filter((c) => c.rating != null)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 15)
    .map((c) => ({ ...c, rating: parseFloat(c.rating.toFixed(1)) }))

  return (
    <div className="bg-surface-container p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Top Rated Companies</h3>
        <p className="text-on-surface-variant text-xs">Company rating out of 5.0</p>
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 16, right: 48, top: 0, bottom: 0 }}>
          <XAxis type="number" domain={[0, 5]} tick={{ fill: "#adaaaa", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fill: "#adaaaa", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={{ color: "#adaaaa" }}
            itemStyle={{ color: "#c3f400" }}
            formatter={(v) => [`${v} / 5.0`, "Rating"]}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <ReferenceLine x={3} stroke="#494847" strokeDasharray="3 3" />
          <Bar dataKey="rating" radius={0} maxBarSize={18} label={{ position: "right", fill: "#adaaaa", fontSize: 10 }}>
            {sorted.map((c, i) => (
              <Cell
                key={i}
                fill={c.rating >= 4.5 ? "#c3f400" : c.rating >= 4.0 ? "#c3f40099" : "#c3f40044"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
