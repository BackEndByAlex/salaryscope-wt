import GitHubIcon from "../icons/GitHubIcon.jsx"

const STATS = [
  { value: "0", color: "text-primary", label: "Records Contributed" },
  { value: "0", color: "text-on-surface", label: "Salary Queries" },
  { value: "2026", color: "text-secondary", label: "Member Since" },
]

function SidebarAvatar() {
  return (
    <div
      className="h-20 w-20 rounded-lg bg-surface-container-highest border border-outline-variant/15 flex items-center justify-center"
      style={{ boxShadow: "0 0 24px rgba(129, 236, 255, 0.12)" }}
    >
      <span className="text-2xl font-black text-primary select-none">U</span>
    </div>
  )
}

function SidebarStats() {
  return (
    <div className="space-y-4">
      {STATS.map(({ value, color, label }) => (
        <div key={label}>
          <p className={`text-3xl font-black leading-none ${color}`}>{value}</p>
          <p className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant mt-1">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function ProfileSidebar() {
  return (
    <aside className="w-80 shrink-0 sticky top-20 self-start bg-surface-container-low p-6 space-y-6">
      <div className="space-y-3">
        <SidebarAvatar />

        <div>
          <p className="text-xl font-black text-on-surface leading-tight">
            Anonymous Operator
          </p>
          <p className="text-sm text-on-surface-variant mt-0.5">
            user@salaryscope.io
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container border border-outline-variant/15 rounded-sm">
          <GitHubIcon className="h-3 w-3 text-on-surface-variant" />
          <span className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
            GitHub
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
            Node Active
          </span>
        </div>
      </div>

      <div className="h-px bg-surface-container-high" />

      <SidebarStats />
    </aside>
  )
}
