import { useEffect } from "react"
import { useToast } from "../toast/ToastProvider.jsx"

/**
 * Returns a human-readable relative timestamp string.
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string}
 */
function relativeTime(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  return `${Math.floor(seconds / 3600)}h ago`
}

/**
 * Dropdown panel that lists all session notifications.
 * Marks everything as read as soon as it mounts (i.e. when the bell is opened).
 *
 * @param {{ onClose: () => void }} props
 */
export default function NotificationDropdown({ onClose }) {
  const { notifications, markAllRead, dismissNotification, clearAllNotifications } =
    useToast()

  // Mark all read the moment the dropdown opens
  useEffect(() => {
    markAllRead()
  }, [markAllRead])

  return (
    <div className="w-80 bg-surface-container border border-outline-variant/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/15">
        <span className="text-sm font-semibold text-on-surface">Notifications</span>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-sm text-on-surface-variant">No notifications yet</span>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 px-4 py-3 border-b border-outline-variant/10 last:border-b-0 hover:bg-surface-container-high transition-colors"
            >
              {/* Type icon */}
              <span
                className={`material-symbols-outlined text-[18px] mt-0.5 shrink-0 ${
                  n.type === "success" ? "text-secondary" : "text-error"
                }`}
              >
                {n.type === "success" ? "check_circle" : "error"}
              </span>

              {/* Message + timestamp */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-on-surface leading-snug wrap-break-word">
                  {n.message}
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {relativeTime(n.timestamp)}
                </p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismissNotification(n.id)}
                className="text-on-surface-variant hover:text-on-surface transition-colors shrink-0 mt-0.5"
                aria-label="Dismiss notification"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
