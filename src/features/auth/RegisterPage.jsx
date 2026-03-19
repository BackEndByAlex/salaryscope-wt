import { Link } from "react-router"
import AuthLayout from "../../shared/components/AuthLayout.jsx"
import OAuthButtons from "../../shared/components/OAuthButtons.jsx"

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Initialize Access"
      subtitle="Join the global telemetry network."
    >
      <OAuthButtons />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

        {/* Password fields — side by side */}
        <div className="grid grid-cols-2 gap-3">
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
          <div className="space-y-1.5">
            <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
              Confirm Access Key
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/30 py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="cyan-glow w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-4 rounded-sm mt-2 active:scale-[0.98] transition-transform"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary hover:text-primary-dim transition-colors font-semibold"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  )
}
