import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useMutation } from "@apollo/client/react"
import AuthLayout from "../../shared/components/auth/AuthLayout.jsx"
import OAuthButtons from "../../shared/components/auth/OAuthButtons.jsx"
import AuthFormField from "../../shared/components/auth/AuthFormField.jsx"
import { REGISTER_MUTATION } from "../../graphql/mutation/auth.js"
import { useAuth } from "./useAuth.js"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { completeAuth } = useAuth()
  const [register, { loading }] = useMutation(REGISTER_MUTATION)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError("Access keys do not match.")
      return
    }

    try {
      const { data } = await register({
        variables: { input: { email, password } },
      })
      await completeAuth(data.register.user)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout
      title="Initialize Access"
      subtitle="Join the global telemetry network."
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

        <div className="grid grid-cols-2 gap-3">
          <AuthFormField
            label="Access Key"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthFormField
            label="Confirm Access Key"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <p className="text-xs text-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="cyan-glow w-full bg-primary text-on-primary font-bold text-sm py-3.5 px-4 rounded-sm mt-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create Account"}
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
