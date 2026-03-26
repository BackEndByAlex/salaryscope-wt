import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const TOOLTIP_STYLE = {
  backgroundColor: "#1a1919",
  border: "1px solid rgba(73,72,71,0.4)",
  borderRadius: 0,
  color: "#fff",
  fontSize: "0.75rem",
}

const EXPERIENCE_COLORS = ["#81ecff", "#81ecff99", "#81ecff55", "#81ecff22"]
const WORK_COLORS = ["#c3f400", "#c3f40088", "#c3f40044"]

function DonutChart({ data, colors, title, subtitle }) {
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="bg-surface-container p-8 flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-on-surface-variant text-xs">{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v) => [v.toLocaleString(), "Records"]}
          />
          <Legend
            iconType="square"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: "#adaaaa", fontSize: "0.7rem" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center text-[0.625rem] text-on-surface-variant/50 uppercase tracking-widest">
        {total.toLocaleString()} total records
      </div>
    </div>
  )
}

export default function BreakdownCharts({ data }) {
  const experienceData = [
    { name: "Senior (SE)", value: data?.senior?.totalCount ?? 0 },
    { name: "Mid (MI)", value: data?.mid?.totalCount ?? 0 },
    { name: "Entry (EN)", value: data?.entry?.totalCount ?? 0 },
    { name: "Executive (EX)", value: data?.executive?.totalCount ?? 0 },
  ]

  const workSettingData = [
    { name: "Remote", value: data?.remote?.totalCount ?? 0 },
    { name: "Hybrid", value: data?.hybrid?.totalCount ?? 0 },
    { name: "In-person", value: data?.inPerson?.totalCount ?? 0 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/10">
      <DonutChart
        data={experienceData}
        colors={EXPERIENCE_COLORS}
        title="By Experience Level"
        subtitle="Distribution across seniority levels"
      />
      <DonutChart
        data={workSettingData}
        colors={WORK_COLORS}
        title="By Work Setting"
        subtitle="Remote vs hybrid vs in-person"
      />
    </div>
  )
}
