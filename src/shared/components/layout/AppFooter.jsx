export default function AppFooter({ links = [], py = "py-6" }) {
  return (
    <footer
      className={`w-full ${py} border-t border-outline-variant/15 bg-surface`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-12 text-[0.6875rem] text-on-surface-variant uppercase tracking-widest gap-4">
        <div>&copy; 2026 SalaryScope Terminal</div>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
