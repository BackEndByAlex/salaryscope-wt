import { useQuery } from "@apollo/client/react"
import { FEATURES_QUERY } from "../../../graphql/queries/home.js"
import TopographyCard from "./TopographyCard.jsx"
import FiltersCard from "./FiltersCard.jsx"
import TerminalCard from "./TerminalCard.jsx"

export default function FeaturesSection() {
  const { data, loading } = useQuery(FEATURES_QUERY)

  const countries = data?.countries?.countries ?? []
  const records = data?.salaryRecords?.records ?? []

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 mb-4 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-3">
            ENGINEERED FOR PRECISION
          </h2>
          <p className="text-on-surface-variant max-w-md">
            Data visualization that goes beyond spreadsheets.
          </p>
        </div>

        {loading ? (
          <div className="h-140 bg-surface-container animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10 md:h-140">
            <TopographyCard countries={countries} />
            <FiltersCard />
            <TerminalCard records={records} />
          </div>
        )}
      </div>
    </section>
  )
}
