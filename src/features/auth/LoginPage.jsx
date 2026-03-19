import { Link } from "react-router"
import RegisterBackground from "./RegisterBackground.jsx"
import Logo from "../../shared/Logo.jsx"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <RegisterBackground />

      {/* Fixed minimal header */}
      <header className="fixed top-0 w-full z-50 h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Logo size={24} variant="wordmark" />
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

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="relative w-full max-w-md">
          {/* Cyan glow blob */}
          <div
            className="absolute -top-20 -left-16 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(129,236,255,0.12) 0%, transparent 70%)",
            }}
          ></div>
          {/* Purple glow blob */}
          <div
            className="absolute -bottom-16 -right-12 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(210,119,255,0.10) 0%, transparent 70%)",
            }}
          ></div>

          {/* Glass card */}
          <div className="form-card relative border border-outline-variant/15 rounded-lg p-10 overflow-hidden">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-transparent via-primary/5 to-transparent opacity-30"></div>

            <div className="relative z-10">
              {/* Title block */}
              <div className="mb-8">
                <h1 className="text-2xl font-black tracking-tight text-on-surface mb-2">
                  Access Terminal
                </h1>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Authenticate to enter the intelligence network.
                </p>
              </div>

              {/* OAuth buttons */}
              <div className="space-y-3 mb-6">
                {/* GitHub */}
                <button className="w-full flex items-center justify-center gap-3 bg-surface-container border border-outline-variant/15 text-on-surface font-semibold text-sm py-3 px-4 rounded-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-on-surface-variant"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Connect with GitHub
                </button>

                {/* Google */}
                <button className="w-full flex items-center justify-center gap-3 bg-surface-container border border-outline-variant/15 text-on-surface font-semibold text-sm py-3 px-4 rounded-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  Connect with Google
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-outline-variant/20"></div>
                <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                  Or Manual Entry
                </span>
                <div className="flex-1 h-px bg-outline-variant/20"></div>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                    Terminal ID / Email
                  </label>
                  <input
                    type="email"
                    placeholder="user@domain.com"
                    className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/30 py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
                  />
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                    Access Key
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/30 py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
                  />
                </div>

                {/* Primary submit */}
                <button
                  type="submit"
                  className="cyan-glow w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-4 rounded-sm mt-2 active:scale-[0.98] transition-transform"
                >
                  Sign In
                </button>
              </form>

              {/* Register link */}
              <p className="text-center text-sm text-on-surface-variant mt-6">
                No account yet?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-dim transition-colors font-semibold"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Below-card micro-links */}
          <div className="flex items-center justify-center gap-4 mt-6 text-[0.625rem] tracking-widest text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">
              API Status
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-outline-variant/15 bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 text-[0.6875rem] text-on-surface-variant uppercase tracking-widest gap-4">
          <div>&copy; 2026 SalaryScope Terminal</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              API Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
