/**
 * Layout — wraps authenticated app pages with the shared navbar and main area.
 * Auth pages (login, register) and the landing page render their own full-screen
 * layouts and do NOT use this component.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <main className="flex-1 pt-16">{children}</main>
    </div>
  )
}
