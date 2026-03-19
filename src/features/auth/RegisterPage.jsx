import { Link } from "react-router"
import AuthLayout from "../../shared/components/auth/AuthLayout.jsx"
import OAuthButtons from "../../shared/components/auth/OAuthButtons.jsx"
import AuthFormField from "../../shared/components/auth/AuthFormField.jsx"

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Initialize Access"
      subtitle="Join the global telemetry network."
    >
      <OAuthButtons />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <AuthFormField label="Terminal ID / Email" type="email" placeholder="user@domain.com" />

        {/* Password fields — side by side */}
        <div className="grid grid-cols-2 gap-3">
          <AuthFormField label="Access Key" type="password" placeholder="••••••••" />
          <AuthFormField label="Confirm Access Key" type="password" placeholder="••••••••" />
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
        <Link to="/login" className="text-primary hover:text-primary-dim transition-colors font-semibold">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  )
}
