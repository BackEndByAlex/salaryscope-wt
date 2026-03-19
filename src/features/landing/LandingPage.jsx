import { Link } from "react-router"
import HeroSection from "./HeroSection.jsx"
import Logo from "../../shared/Logo.jsx"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">
      {/* Navbar */}
      <header
        className="fixed top-0 w-full z-50 h-16 bg-surface-container-low flex items-center justify-between px-6"
        style={{ boxShadow: "0px 0px 32px rgba(129, 236, 255, 0.08)" }}
      >
        <div className="flex items-center gap-8">
          <Logo size={28} variant="wordmark" />
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
            >
              Trends
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
            >
              Geography
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 hover:backdrop-blur-md p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]">
            notifications
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60 hover:backdrop-blur-md p-2 rounded-full transition-all duration-200 active:scale-95 text-[20px]">
            settings
          </button>
          <div className="h-8 w-8 rounded-full bg-surface-container-high ring-1 ring-outline-variant/15 flex items-center justify-center text-xs font-bold text-primary">
            U
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative min-h-[85vh] lg:min-h-230.25 flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
          <HeroSection />
          <div className="grid grid-cols-1 gap-12 items-center w-full max-w-7xl mx-auto text-center">
            {/* Hero text */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 mb-6 rounded-full">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                  Live Global Market Data
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8">
                Global Salary <br />
                <span className="gradient-text">Intelligence</span> <br />
                for Developers
              </h1>
              <p className="text-on-surface-variant text-lg max-w-lg mx-auto mb-12 font-medium">
                Visualize benchmark salaries across 100+ countries and 10,000+
                companies, from entry-level to executive and everything in
                between between 2020 to 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="cyan-glow bg-primary text-on-primary font-bold px-8 py-4 rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <span>Enter Dashboard</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
                <Link
                  to="/register"
                  className="bg-transparent border border-outline-variant/15 text-on-surface font-bold px-8 py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    brand_awareness
                  </span>
                  <span>Login with GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-surface-container-low border-y border-outline-variant/15">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black text-on-surface tracking-tighter">
                137,000+
              </div>
              <div className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Verified Records
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-secondary tracking-tighter">
                100+
              </div>
              <div className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Covered Countries
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-primary tracking-tighter">
                10,000+
              </div>
              <div className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Global Companies
              </div>
            </div>
          </div>
        </section>

        {/* Features bento grid */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-black tracking-tighter mb-4">
                ENGINEERED FOR PRECISION
              </h2>
              <p className="text-on-surface-variant max-w-md">
                Data visualization that goes beyond spreadsheets.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-150">
              {/* Large card */}
              <div className="md:col-span-2 md:row-span-2 bg-surface-container p-8 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      3D Market Topography
                    </h3>
                    <p className="text-on-surface-variant text-sm max-w-xs">
                      Visualize salary distribution across continents with
                      high-fidelity depth mapping.
                    </p>
                  </div>
                  <div className="mt-8">
                    <span className="bg-surface-variant px-4 py-2 rounded text-[0.6875rem] font-bold uppercase tracking-wider text-secondary cursor-pointer hover:text-on-surface transition-colors">
                      Explore Map
                    </span>
                  </div>
                </div>
                {/* Decorative background — real visualization replaces this later */}
                <div className="absolute top-0 right-0 w-2/3 h-full opacity-40 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <div className="w-full h-full bg-linear-to-br from-primary/10 via-primary/5 to-transparent"></div>
                </div>
              </div>

              {/* Atomic Filters */}
              <div className="bg-surface-container p-8 flex flex-col justify-between border-l-2 border-secondary">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">
                    tune
                  </span>
                  <h3 className="text-xl font-bold">Atomic Filters</h3>
                  <p className="text-on-surface-variant text-xs">
                    Filter by experience level, tech stack, currency, and
                    work-setting in real-time.
                  </p>
                </div>
              </div>

              {/* Direct Access */}
              <div className="bg-surface-container p-8 flex flex-col justify-between border-l-2 border-primary">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    terminal
                  </span>
                  <h3 className="text-xl font-bold">Direct Access</h3>
                  <p className="text-on-surface-variant text-xs">
                    Query the database via intuitive terminal-style search with
                    instant predictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-75 bg-tertiary/5 blur-[100px]"></div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
              Ready to master your market value?
            </h2>
            <button className="cyan-glow bg-primary text-on-primary font-bold px-10 py-5 rounded-sm active:scale-95 transition-transform">
              Get Started Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-outline-variant/15 bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 text-[0.6875rem] text-on-surface-variant uppercase tracking-widest gap-4">
          <div>© 2026 SalaryScope Terminal</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">
              Gitlab Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
