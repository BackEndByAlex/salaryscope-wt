import { useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useApolloClient } from "@apollo/client/react"
import {
  GITHUB_LOGIN_MUTATION,
  GOOGLE_LOGIN_MUTATION,
} from "../../graphql/mutation/auth.js"
import { useAuth } from "./useAuth.js"

export default function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const apolloClient = useApolloClient()
  const { setUser } = useAuth()
  const called = useRef(false)

  useEffect(() => {
    // Strict Mode fires effects twice in dev — guard against double execution
    if (called.current) return
    called.current = true

    async function handleCallback() {
      const code = searchParams.get("code")
      const state = searchParams.get("state")
      const error = searchParams.get("error")

      if (error) {
        navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true })
        return
      }

      if (!code || !state) {
        navigate("/login?error=missing_params", { replace: true })
        return
      }

      // CSRF check — state must match what we stored before the redirect
      const savedState = sessionStorage.getItem("oauth_state")
      if (state !== savedState) {
        navigate("/login?error=state_mismatch", { replace: true })
        return
      }

      const codeVerifier = sessionStorage.getItem("oauth_code_verifier")
      const provider = savedState.split(".").pop()
      sessionStorage.removeItem("oauth_state")
      sessionStorage.removeItem("oauth_code_verifier")

      const mutation =
        provider === "google" ? GOOGLE_LOGIN_MUTATION : GITHUB_LOGIN_MUTATION
      const resultKey = provider === "google" ? "googleLogin" : "githubLogin"

      try {
        const { data } = await apolloClient.mutate({
          mutation,
          variables: { input: { code, codeVerifier } },
        })
        setUser(data[resultKey].user)
        navigate("/dashboard", { replace: true })
      } catch (err) {
        navigate(`/login?error=${encodeURIComponent(err.message)}`, {
          replace: true,
        })
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-on-surface-variant">
          Authenticating with GitHub…
        </p>
      </div>
    </div>
  )
}
