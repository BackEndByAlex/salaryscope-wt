export default function CtaSection() {
  return (
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
  )
}
