import { useQuery } from "@apollo/client/react"
import {
  COUNTRY_SIDEBAR_QUERY,
  CITY_SIDEBAR_QUERY,
} from "../../graphql/queries/sidebar.js"
import SidebarStats from "../../shared/components/sidebar/SidebarStats.jsx"
import SidebarSection from "../../shared/components/sidebar/SidebarSection.jsx"
import SalaryList from "../../shared/components/sidebar/SalaryList.jsx"

export default function DashboardSidebar({ country, city, onClose }) {
  const isOpen = !!(country || city)
  const selected = city ?? country
  const isCity = !!city

  const { data: countryData, loading: countryLoading } = useQuery(
    COUNTRY_SIDEBAR_QUERY,
    { skip: !country?.id, variables: { countryId: country?.id } },
  )

  const { data: cityData, loading: cityLoading } = useQuery(
    CITY_SIDEBAR_QUERY,
    { skip: !city?.id, variables: { cityId: city?.id } },
  )

  const data = isCity ? cityData : countryData
  const loading = isCity ? cityLoading : countryLoading

  return (
    <div
      className={`absolute top-16 right-0 bottom-0 w-72 flex flex-col
                  bg-surface/90 backdrop-blur-md border-l border-outline-variant/20
                  z-10 overflow-y-auto transform transition-transform duration-300
                  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-outline-variant/15 shrink-0">
        <div>
          <p className="text-[0.625rem] uppercase tracking-widest font-bold text-on-surface-variant/50">
            {isCity ? "City" : "Country"}
          </p>
          <h2 className="text-lg font-black tracking-tight leading-tight mt-0.5">
            {selected?.name ?? "—"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Close panel"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      {/* Breakdown stats */}
      <SidebarStats data={data} loading={loading} />

      {/* Paginated salary records */}
      {isOpen && (
        <SidebarSection label="Salary Records">
          <SalaryList
            countryId={!isCity ? country?.id : null}
            cityId={isCity ? city?.id : null}
          />
        </SidebarSection>
      )}
    </div>
  )
}
