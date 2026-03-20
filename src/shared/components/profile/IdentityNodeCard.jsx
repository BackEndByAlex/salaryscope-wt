function LockIcon() {
  return (
    <span className="material-symbols-outlined text-on-surface-variant/40 text-[16px] select-none">
      lock
    </span>
  )
}

function ReadOnlyField({ label, value }) {
  return (
    <div className="space-y-1.5 flex-1 min-w-0">
      <label className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-bold">
        {label}
      </label>
      <div className="flex items-center bg-surface-container-lowest border border-outline-variant/20 py-3 px-4 rounded-sm gap-2">
        <span className="text-sm text-on-surface flex-1 truncate">{value}</span>
        <LockIcon />
      </div>
    </div>
  )
}

export default function IdentityNodeCard({ user, loading }) {
  const displayName = loading ? "…" : (user?.email.split("@")[0] ?? "—")
  const email = loading ? "…" : (user?.email ?? "—")

  return (
    <div className="bg-surface-container p-6 space-y-5">
      <div>
        <p className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
          Identity Node
        </p>
      </div>

      <div className="flex gap-4">
        <ReadOnlyField label="Display Name" value={displayName} />
        <ReadOnlyField label="Email" value={email} />
      </div>
    </div>
  )
}
