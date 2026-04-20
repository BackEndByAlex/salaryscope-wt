export default function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-60 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

function Toast({ toast, onDismiss }) {
  const isSuccess = toast.type === "success"

  const borderClass = isSuccess ? "border-secondary" : "border-error"
  const icon = isSuccess ? "check_circle" : "error"

  return (
    <div
      className={`flex items-center gap-3 bg-surface-container border-l-4 ${borderClass} text-on-surface px-4 py-3 rounded-sm shadow-lg text-sm min-w-70 max-w-95 animate-slide-in`}
      role="alert"
    >
      <span
        className={`material-symbols-outlined shrink-0 text-base leading-none ${isSuccess ? "text-secondary" : "text-error"}`}
        style={{ fontSize: "1.125rem" }}
      >
        {icon}
      </span>

      <span className="flex-1 leading-snug">{toast.message}</span>

      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-on-surface-variant hover:text-on-surface transition-colors leading-none ml-1"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}
