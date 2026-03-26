import { Link } from "react-router"

const AVATARS = ["#81ecff", "#c3f400", "#d277ff", "#81ecff", "#ffffff"]

export default function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-tertiary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-50 bg-primary/5 blur-[80px] pointer-events-none" />

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 mb-8 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
          <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
            Free to explore
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">
          Ready to master your <br />
          <span className="gradient-text">market value?</span>
        </h2>

        <p className="text-on-surface-variant text-lg mb-10 max-w-md mx-auto">
          Explore 137,000 salary records across 100+ countries — no account required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            to="/dashboard"
            className="cyan-glow bg-primary text-on-primary font-bold px-10 py-4 rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span>Enter Dashboard</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link
            to="/register"
            className="bg-transparent border border-outline-variant/20 text-on-surface font-bold px-10 py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-surface-container transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Create Account</span>
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {AVATARS.map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[0.5rem] font-bold"
                style={{ backgroundColor: color + "22", borderColor: color + "44", color }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-on-surface-variant text-xs font-medium">
            Join <span className="text-on-surface font-bold">2,400+</span> engineers already benchmarking
          </span>
        </div>
      </div>
    </section>
  )
}
