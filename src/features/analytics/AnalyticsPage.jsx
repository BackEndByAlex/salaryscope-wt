import { useQuery } from "@apollo/client/react"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import OverviewStats from "../../shared/components/charts/OverviewStats.jsx"
import TopCountriesChart from "../../shared/components/charts/TopCountriesChart.jsx"
import TopCompaniesChart from "../../shared/components/charts/TopCompaniesChart.jsx"
import JobCategoriesChart from "../../shared/components/charts/JobCategoriesChart.jsx"
import BreakdownCharts from "../../shared/components/charts/BreakdownCharts.jsx"
import {
  ANALYTICS_OVERVIEW_QUERY,
  ANALYTICS_CHARTS_QUERY,
  ANALYTICS_BREAKDOWN_QUERY,
} from "../../graphql/queries/analytics.js"

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 mb-3 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
          {label}
        </span>
      </div>
      <h2 className="text-3xl font-black tracking-tighter mb-2">{title}</h2>
      {subtitle && <p className="text-on-surface-variant text-sm">{subtitle}</p>}
    </div>
  )
}

export default function AnalyticsPage() {
  const { data: overviewData, loading: overviewLoading } = useQuery(ANALYTICS_OVERVIEW_QUERY)
  const { data: chartsData,   loading: chartsLoading   } = useQuery(ANALYTICS_CHARTS_QUERY)
  const { data: breakdownData } = useQuery(ANALYTICS_BREAKDOWN_QUERY)

  return (
    <div className="min-h-screen bg-surface">
      <LandingNav />

      <main className="pt-16">
        {/* Page header */}
        <div className="px-6 md:px-12 lg:px-24 py-16 border-b border-outline-variant/15">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 mb-6 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Live Data · 2020–2025
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-4">
              Salary <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl">
              Explore patterns across 137,000+ salary records from 100+ countries and 10,000+ companies.
            </p>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24 py-16 space-y-20 max-w-7xl mx-auto">

          {/* Section 1 — Overview */}
          <section>
            <SectionHeader
              label="Overview"
              title="Dataset at a Glance"
              subtitle="Total coverage across the full dataset."
            />
            {overviewLoading
              ? <div className="h-32 bg-surface-container animate-pulse" />
              : <OverviewStats data={overviewData} />
            }
          </section>

          {/* Section 2 — Top Countries */}
          <section>
            <SectionHeader
              label="Geography"
              title="Top Countries by Records"
              subtitle="Which countries contribute the most salary data."
            />
            {chartsLoading
              ? <div className="h-96 bg-surface-container animate-pulse" />
              : <TopCountriesChart data={chartsData} />
            }
          </section>

          {/* Section 3 — Top Companies */}
          <section>
            <SectionHeader
              label="Companies"
              title="Top Rated Companies"
              subtitle="Highest employer ratings from the salary_extra dataset."
            />
            {chartsLoading
              ? <div className="h-96 bg-surface-container animate-pulse" />
              : <TopCompaniesChart data={chartsData} />
            }
          </section>

          {/* Section 4 — Job Categories */}
          <section>
            <SectionHeader
              label="Roles"
              title="Jobs by Category"
              subtitle="How many job titles fall into each category."
            />
            {chartsLoading
              ? <div className="h-64 bg-surface-container animate-pulse" />
              : <JobCategoriesChart data={chartsData} />
            }
          </section>

          {/* Section 5 — Breakdowns */}
          <section>
            <SectionHeader
              label="Breakdown"
              title="Experience & Work Setting"
              subtitle="Distribution of records by seniority level and work arrangement."
            />
            <BreakdownCharts data={breakdownData} />
          </section>

        </div>
      </main>
    </div>
  )
}
