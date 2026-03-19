import { Link } from "react-router"
import Logo from "../Logo.jsx"

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
          <a href="#" className="text-on-surface-variant hover:text-on-surface text-sm transition-colors">Analytics</a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface text-sm transition-colors">Trends</a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface text-sm transition-colors">Geography</a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 hover:backdrop-blur-md p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]">
          notifications
        </button>
        <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 hover:backdrop-blur-md p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]">
          settings
        </button>
        <Link
          to="/profile"
          className="h-8 w-8 rounded-full bg-surface-container-high ring-1 ring-outline-variant/15 flex items-center justify-center text-xs font-bold text-primary hover:ring-primary/40 transition-all"
        >
          U
        </Link>
      </div>
    </header>
  )
}
