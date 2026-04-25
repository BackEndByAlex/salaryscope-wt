export default function ReadOnlyField({ label, value }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
        {label}
      </label>
      <div className="bg-surface-container-lowest border border-outline-variant/20 py-3.5 px-4 rounded-sm text-sm text-on-surface-variant">
        {value}
      </div>
    </div>
  )
}
