import { Link } from "react-router"
import Logo from "../Logo.jsx"

export default function AuthHeader() {
  return (
    <header className="fixed top-0 w-full z-50 h-14 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center">
          <Logo size={24} variant="wordmark" />
        </Link>
        <span className="h-4 w-px bg-outline-variant/40"></span>
        <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
          Oracle Node v4.0
        </span>
      </div>
      <div className="flex items-center gap-2 border border-outline-variant/15 rounded-sm px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
        </span>
        <span className="text-[0.625rem] uppercase tracking-widest font-bold text-on-surface-variant">
          Encrypted PKCE Protocol Active
        </span>
      </div>
    </header>
  )
}
