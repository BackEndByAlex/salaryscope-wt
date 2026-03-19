import RegisterBackground from "../../../features/auth/RegisterBackground.jsx"
import AuthHeader from "./AuthHeader.jsx"

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <RegisterBackground />
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="relative w-full max-w-md">
          {/* Cyan glow blob */}
          <div
            className="absolute -top-20 -left-16 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(129,236,255,0.12) 0%, transparent 70%)",
            }}
          />
          {/* Purple glow blob */}
          <div
            className="absolute -bottom-16 -right-12 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(210,119,255,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Glass card */}
          <div className="form-card relative border border-outline-variant/15 rounded-lg p-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-transparent via-primary/5 to-transparent opacity-30" />

            <div className="relative z-10">
              <div className="mb-8">
                <h1 className="text-2xl font-black tracking-tight text-on-surface mb-2">
                  {title}
                </h1>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {subtitle}
                </p>
              </div>
              {children}
            </div>
          </div>

          {/* Below-card micro-links */}
          <div className="flex items-center justify-center gap-4 mt-6 text-[0.625rem] tracking-widest text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">
              API Status
            </a>
            <span className="opacity-30">·</span>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Protocol
            </a>
            <span className="opacity-30">·</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </main>

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
