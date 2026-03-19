import { Link } from "react-router"
import AuthLayout from "../../shared/components/auth/AuthLayout.jsx"
import OAuthButtons from "../../shared/components/auth/OAuthButtons.jsx"
import AuthFormField from "../../shared/components/auth/AuthFormField.jsx"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Access Terminal"
      subtitle="Authenticate to enter the intelligence network."
    >
      <OAuthButtons />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <AuthFormField label="Terminal ID / Email" type="email" placeholder="user@domain.com" />
        <AuthFormField label="Access Key" type="password" placeholder="••••••••" />

        <button
          type="submit"
          className="cyan-glow w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-4 rounded-sm mt-2 active:scale-[0.98] transition-transform"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant mt-6">
        No account yet?{" "}
        <Link to="/register" className="text-primary hover:text-primary-dim transition-colors font-semibold">
          Create Account
        </Link>
      </p>
    </AuthLayout>
  )
}
