import { Link } from "react-router"
import Logo from "../Logo.jsx"
import UserMenu from "./UserMenu.jsx"

export default function LandingNav() {
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
            href="#"
            className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
          >
            Trends
          </a>

        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 hover:backdrop-blur-md p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]">
          notifications
        </button>
        <UserMenu />
      </div>
    </header>
  )
}
