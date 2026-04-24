import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Logo from "../Logo.jsx"
import UserMenu from "./UserMenu.jsx"
import NotificationDropdown from "../notification/NotificationDropdown.jsx"
import { useToast } from "../toast/ToastProvider.jsx"

export default function LandingNav() {
  const [open, setOpen] = useState(false)
  const bellRef = useRef(null)
  const { unreadCount } = useToast()

  // Close dropdown on outside click — same pattern as UserMenu
  useEffect(() => {
    function handleClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Badge label: cap at 9+
  const badgeLabel = unreadCount > 9 ? "9+" : String(unreadCount)

  return (
    <header
      className="fixed top-0 w-full z-50 h-16 bg-surface-container-low flex items-center justify-between px-6"
      style={{ boxShadow: "0px 0px 32px rgba(129, 236, 255, 0.08)" }}
    >
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <Logo size={28} variant="wordmark" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/analytics"
            className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
          >
            Analytics
          </Link>
          <a
            href="/wt-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
          >
            WT Docs
          </a>
          <a
            href={`${import.meta.env.VITE_API_URL}/api-docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
          >
            API Docs
          </a>
          <a
            href={import.meta.env.VITE_GRAPHQL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
          >
            Apollo
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Bell with notification badge */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Notifications"
            className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 hover:backdrop-blur-md p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]"
          >
            notifications
          </button>

          {/* Unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-error text-on-error text-[10px] font-bold leading-none pointer-events-none">
              {badgeLabel}
            </span>
          )}

          {/* Dropdown — z-[70] sits above nav z-50 and toast z-60 */}
          {open && (
            <div className="absolute right-0 top-12 z-[70]">
              <NotificationDropdown onClose={() => setOpen(false)} />
            </div>
          )}
        </div>

        <UserMenu />
      </div>
    </header>
  )
}
