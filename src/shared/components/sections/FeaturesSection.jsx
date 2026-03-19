export default function FeaturesSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-4">ENGINEERED FOR PRECISION</h2>
          <p className="text-on-surface-variant max-w-md">Data visualization that goes beyond spreadsheets.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-150">
          {/* Large card */}
          <div className="md:col-span-2 md:row-span-2 bg-surface-container p-8 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">3D Market Topography</h3>
                <p className="text-on-surface-variant text-sm max-w-xs">
                  Visualize salary distribution across continents with high-fidelity depth mapping.
                </p>
              </div>
              <div className="mt-8">
                <span className="bg-surface-variant px-4 py-2 rounded text-[0.6875rem] font-bold uppercase tracking-wider text-secondary cursor-pointer hover:text-on-surface transition-colors">
                  Explore Map
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-40 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <div className="w-full h-full bg-linear-to-br from-primary/10 via-primary/5 to-transparent"></div>
            </div>
          </div>

          {/* Atomic Filters */}
          <div className="bg-surface-container p-8 flex flex-col justify-between border-l-2 border-secondary">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-secondary text-3xl">tune</span>
              <h3 className="text-xl font-bold">Atomic Filters</h3>
              <p className="text-on-surface-variant text-xs">
                Filter by experience level, tech stack, currency, and work-setting in real-time.
              </p>
            </div>
          </div>

          {/* Direct Access */}
          <div className="bg-surface-container p-8 flex flex-col justify-between border-l-2 border-primary">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
              <h3 className="text-xl font-bold">Direct Access</h3>
              <p className="text-on-surface-variant text-xs">
                Query the database via intuitive terminal-style search with instant predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
