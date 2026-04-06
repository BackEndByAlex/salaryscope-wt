export default function SidebarSection({ label, children }) {
  return (
    <div className="px-5 py-4 border-b border-outline-variant/15">
      <p className="text-[0.625rem] uppercase tracking-widest font-bold text-on-surface-variant/50 mb-3">
        {label}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
