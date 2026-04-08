import GitHubIcon from "../icons/GitHubIcon.jsx"
import GoogleIcon from "../icons/GoogleIcon.jsx"
import { redirectToGitHub } from "../../../features/auth/pkce.js"

export default function OAuthButtons() {
  return (
    <>
      <div className="space-y-3 mb-6">
        <button
          onClick={redirectToGitHub}
          className="w-full flex items-center justify-center gap-3 bg-surface-container border border-outline-variant/15 text-on-surface font-semibold text-sm py-3 px-4 rounded-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]"
        >
          <GitHubIcon className="w-4.5 h-4.5 text-on-surface-variant" />
          Connect with GitHub
        </button>

        <button
          disabled
          title="Google login coming soon"
          className="w-full flex items-center justify-center gap-3 bg-surface-container border border-outline-variant/15 text-on-surface font-semibold text-sm py-3 px-4 rounded-sm opacity-40 cursor-not-allowed"
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
