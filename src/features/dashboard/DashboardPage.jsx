import { useState, useCallback } from "react"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import GlobeMap from "../../shared/components/map/GlobeMap.jsx"
import DashboardSidebar from "./DashboardSidebar.jsx"
import DashboardFilterSidebar from "./DashboardFilterSidebar.jsx"
import { useGlobeData } from "../../shared/hooks/useGlobeData.js"
import { useDashboardFilters } from "../../shared/hooks/useDashboardFilters.js"

export default function DashboardPage() {
  const {
    countryGeoJSON,
    cityGeoJSON,
    handleMapLoad,
    handleMoveEnd,
    handleIdle,
  } = useGlobeData()

  const { filters, activeCount, toggle, clear, clearFilter } =
    useDashboardFilters()

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  const handleCountryClick = useCallback(
    (properties) => {
      setSelectedCountry((prev) => {
        if (prev?.id !== properties.id && filters.companyId) {
          clearFilter("company")
        }
        return properties
      })
      setSelectedCity(null)
    },
    [filters.companyId, clearFilter],
  )

  const handleCityClick = useCallback((properties) => {
    setSelectedCity(properties)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedCountry(null)
    setSelectedCity(null)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      <LandingNav />

      <main className="flex-1 pt-16 flex overflow-hidden">
        {/* Left — filter sidebar */}
        <DashboardFilterSidebar
          filters={filters}
          activeCount={activeCount}
          onToggle={toggle}
          onClear={clear}
          selectedCountryId={selectedCountry?.id ?? null}
        />

        {/* Center — globe, right sidebar overlays on top */}
        <div className="flex-1 relative">
          <GlobeMap
            countryGeoJSON={countryGeoJSON}
            cityGeoJSON={cityGeoJSON}
            onLoad={handleMapLoad}
            onMoveEnd={handleMoveEnd}
            onIdle={handleIdle}
            onCountryClick={handleCountryClick}
            onCityClick={handleCityClick}
          />

          <DashboardSidebar
            country={selectedCountry}
            city={selectedCity}
            onClose={handleClose}
            filters={filters}
          />
        </div>
      </main>
    </div>
  )
}
