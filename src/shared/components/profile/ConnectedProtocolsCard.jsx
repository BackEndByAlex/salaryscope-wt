import GitHubIcon from "../icons/GitHubIcon.jsx"
import GoogleIcon from "../icons/GoogleIcon.jsx"

function ProtocolRow({ icon, title, subtitle, connected }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-on-surface">{title}</p>
          <p className="text-[0.6875rem] text-on-surface-variant/60 tracking-wide mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {connected ? (
        <span className="inline-flex items-center px-2.5 py-1 text-[0.6875rem] uppercase tracking-widest text-secondary bg-secondary/10 border border-secondary/20 rounded-sm">
          Connected
        </span>
      ) : (
        <button className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant border border-outline-variant/15 px-3 py-1 rounded-sm hover:border-outline-variant/30 hover:text-on-surface transition-colors">
          Connect
        </button>
      )}
    </div>
  )
}

export default function ConnectedProtocolsCard({ user, loading }) {
  return (
    <div className="bg-surface-container p-6">
      <p className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant mb-2">
        Connected Protocols
      </p>

      <div className="divide-y divide-surface-container-high">
        <ProtocolRow
          icon={<GitHubIcon className="h-5 w-5 text-on-surface-variant" />}
          title="GitHub"
          subtitle="oauth2 · pkce"
          connected={loading ? false : (user?.githubConnected ?? false)}
        />
        <ProtocolRow
          icon={<GoogleIcon className="h-5 w-5" />}
          title="Google"
          subtitle="oauth2 · pkce"
          connected={loading ? false : (user?.googleConnected ?? false)}
        />
      </div>
    </div>
  )
}
