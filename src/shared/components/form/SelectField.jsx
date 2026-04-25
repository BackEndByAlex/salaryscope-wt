export default function SelectField({ label, value, onChange, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
      >
        {children}
      </select>
    </div>
  )
}
