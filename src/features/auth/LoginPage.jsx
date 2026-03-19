import { Link } from "react-router"
import AuthLayout from "../../shared/components/AuthLayout.jsx"
import OAuthButtons from "../../shared/components/OAuthButtons.jsx"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Access Terminal"
      subtitle="Authenticate to enter the intelligence network."
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

        <button
          type="submit"
          className="cyan-glow w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-4 rounded-sm mt-2 active:scale-[0.98] transition-transform"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant mt-6">
        No account yet?{" "}
        <Link
          to="/register"
          className="text-primary hover:text-primary-dim transition-colors font-semibold"
        >
          Create Account
        </Link>
      </p>
    </AuthLayout>
  )
}
