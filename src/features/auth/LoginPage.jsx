import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useMutation } from "@apollo/client/react"
import AuthLayout from "../../shared/components/auth/AuthLayout.jsx"
import OAuthButtons from "../../shared/components/auth/OAuthButtons.jsx"
import AuthFormField from "../../shared/components/auth/AuthFormField.jsx"
import { LOGIN_MUTATION } from "../../graphql/mutation/auth.js"
import { useAuth } from "./useAuth.js"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [login, { loading }] = useMutation(LOGIN_MUTATION)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const { data } = await login({
        variables: { input: { email, password } },
      })
      setUser(data.login.user)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout
      title="Access Terminal"
      subtitle="Authenticate to enter the intelligence network."
    >
      <OAuthButtons />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthFormField
          label="Terminal ID / Email"
          type="email"
          placeholder="user@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthFormField
          label="Access Key"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-xs text-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="cyan-glow w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-4 rounded-sm mt-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
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
