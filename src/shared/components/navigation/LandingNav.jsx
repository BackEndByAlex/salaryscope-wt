import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Logo from "../Logo.jsx"
import UserMenu from "./UserMenu.jsx"
import NotificationDropdown from "../notification/NotificationDropdown.jsx"
import { useToast } from "../toast/ToastProvider.jsx"

const NAV_LINKS = [
  { label: "Analytics", to: "/analytics", internal: true },
  { label: "WT Docs", href: "/wt-docs" },
]

export default function LandingNav() {
  const [bellOpen, setBellOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const bellRef = useRef(null)
  const { unreadCount } = useToast()

  useEffect(() => {
    function handleClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const badgeLabel = unreadCount > 9 ? "9+" : String(unreadCount)

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 h-16 bg-surface-container-low flex items-center justify-between px-4 md:px-6"
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

        <div className="flex items-center gap-2">
          {/* Bell */}
          <div className="relative" ref={bellRef}>
            <button
              onClick={() => setBellOpen((v) => !v)}
              aria-label="Notifications"
              className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]"
            >
              notifications
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full bg-error text-on-error text-[10px] font-bold leading-none pointer-events-none">
                {badgeLabel}
              </span>
            )}
            {bellOpen && (
              <div className="absolute right-0 top-12 z-70">
                <NotificationDropdown onClose={() => setBellOpen(false)} />
              </div>
            )}
          </div>

          <UserMenu />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="md:hidden fixed top-16 left-0 right-0 z-40 bg-surface-container-low border-b border-outline-variant/15 py-2 flex flex-col">
            <Link
              to="/analytics"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Analytics
            </Link>
            <a
              href="/wt-docs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              WT Docs
            </a>
            <a
              href={`${import.meta.env.VITE_API_URL}/api-docs`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              API Docs
            </a>
            <a
              href={import.meta.env.VITE_GRAPHQL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Apollo
            </a>
          </nav>
        </>
      )}
    </>
  )
}
