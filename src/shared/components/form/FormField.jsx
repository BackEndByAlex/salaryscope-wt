export default function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/30 py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
      />
    </div>
  )
}
