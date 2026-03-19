import { Link } from "react-router"
import HeroSection from "../../../features/landing/HeroSection.jsx"

export default function HeroContent() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-230.25 flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      <HeroSection />
      <div className="grid grid-cols-1 gap-12 items-center w-full max-w-7xl mx-auto text-center">
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
            companies, from entry-level to executive and everything in between
            between 2020 to 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cyan-glow bg-primary text-on-primary font-bold px-8 py-4 rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <span>Enter Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <Link
              to="/register"
              className="bg-transparent border border-outline-variant/15 text-on-surface font-bold px-8 py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">brand_awareness</span>
              <span>Login with GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
