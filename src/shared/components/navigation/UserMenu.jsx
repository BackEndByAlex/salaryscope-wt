import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../../../features/auth/useAuth.js"
import { useToast } from "../toast/ToastProvider.jsx"

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const toast = useToast()

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  async function handleLogout() {
    setOpen(false)
    await logout()
    toast.success("Logged out")
    navigate("/")
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? null

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-8 w-8 rounded-full bg-surface-container-high ring-1 ring-outline-variant/15 flex items-center justify-center text-xs font-bold text-primary hover:ring-primary/40 transition-all"
        aria-label="User menu"
      >
        {initial ?? (
          <span className="material-symbols-outlined text-[16px]">person</span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-11 w-56 bg-surface-container border border-outline-variant/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50">
          {user ? (
            <>
              {/* User info header */}
              <div className="px-4 py-3 border-b border-outline-variant/15">
                <div className="text-[0.625rem] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                  Signed in as
                </div>
                <div className="text-sm font-medium text-on-surface truncate">
                  {user.email}
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person
                  </span>
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    settings
                  </span>
                  Settings
                </Link>
              </div>

              <div className="border-t border-outline-variant/15 py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/8 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Guest header */}
              <div className="px-4 py-3 border-b border-outline-variant/15">
                <div className="text-[0.625rem] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                  Not signed in
                </div>
                <div className="text-xs text-on-surface-variant">
                  Sign in to unlock all features
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    login
                  </span>
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  Create account
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
