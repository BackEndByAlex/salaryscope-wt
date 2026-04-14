import { useMutation } from "@apollo/client/react"
import GitHubIcon from "../icons/GitHubIcon.jsx"
import GoogleIcon from "../icons/GoogleIcon.jsx"
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "../../../features/auth/pkce.js"
import {
  BEGIN_GOOGLE_LOGIN_MUTATION,
  BEGIN_GITHUB_LOGIN_MUTATION,
} from "../../../graphql/mutation/auth.js"

export default function OAuthButtons() {
  const [beginGoogle] = useMutation(BEGIN_GOOGLE_LOGIN_MUTATION)
  const [beginGithub] = useMutation(BEGIN_GITHUB_LOGIN_MUTATION)

  async function handleGoogleLogin() {
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const { data } = await beginGoogle({ variables: { input: { codeChallenge } } })
    sessionStorage.setItem("oauth_code_verifier", codeVerifier)
    sessionStorage.setItem("oauth_provider", "google")
    window.location.href = data.beginGoogleLogin.authUrl
  }

  async function handleGithubLogin() {
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const { data } = await beginGithub({ variables: { input: { codeChallenge } } })
    sessionStorage.setItem("oauth_code_verifier", codeVerifier)
    sessionStorage.setItem("oauth_provider", "github")
    window.location.href = data.beginGithubLogin.authUrl
  }

  return (
    <>
      <div className="space-y-3 mb-6">
        <button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3 bg-surface-container border border-outline-variant/15 text-on-surface font-semibold text-sm py-3 px-4 rounded-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]"
        >
          <GitHubIcon className="w-4.5 h-4.5 text-on-surface-variant" />
          Connect with GitHub
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-surface-container border border-outline-variant/15 text-on-surface font-semibold text-sm py-3 px-4 rounded-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]"
        >
          <GoogleIcon className="w-4.5 h-4.5" />
          Connect with Google
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-outline-variant/20"></div>
        <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
          Or Manual Entry
        </span>
        <div className="flex-1 h-px bg-outline-variant/20"></div>
      </div>
    </>
  )
}
