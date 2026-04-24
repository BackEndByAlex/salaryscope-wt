import { useState, useCallback } from "react"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import GlobeMap from "../../shared/components/map/GlobeMap.jsx"
import DashboardSidebar from "./DashboardSidebar.jsx"
import DashboardFilterSidebar from "./DashboardFilterSidebar.jsx"
import CreateRecordModal from "./CreateRecordModal.jsx"
import { useGlobeData } from "../../shared/hooks/useGlobeData.js"
import { useDashboardFilters } from "../../shared/hooks/useDashboardFilters.js"
import { useAuth } from "../auth/useAuth.js"

export default function DashboardPage() {
  const {
    countryGeoJSON,
    cityGeoJSON,
    handleMapLoad,
    handleMoveEnd,
    handleIdle,
    refetchCities,
    getCountryIdByName,
  } = useGlobeData()

  const { filters, activeCount, toggle, clear, clearFilter } =
    useDashboardFilters()

  const { user } = useAuth()
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [isAddMode, setIsAddMode] = useState(false)
  const [pendingLocation, setPendingLocation] = useState(null)

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

  const handleAddClick = useCallback(
    (countryName, cityName) => {
      const countryId = getCountryIdByName(countryName)
      setIsAddMode(false)
      setPendingLocation({ countryName, countryId, cityName })
    },
    [getCountryIdByName],
  )

  const handleCreated = useCallback(() => {
    setPendingLocation(null)
    refetchCities()
  }, [refetchCities])

  const handleSearchSelect = useCallback(
    ({ countryId, countryName, cityId, cityName }) => {
      if (countryId) setSelectedCountry({ id: countryId, name: countryName })
      if (cityId) setSelectedCity({ id: cityId, name: cityName })
    },
    [],
  )

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
          selectedCityId={selectedCity?.id ?? null}
          onSearchSelect={handleSearchSelect}
        />

        {/* Center — globe, right sidebar overlays on top */}
        <div className="flex-1 relative">
          {/* Add mode banner */}
          {isAddMode && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-primary/90 text-on-primary text-xs px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
              Click anywhere on the map to add your salary
            </div>
          )}

          {/* Add salary button — authenticated users only */}
          {user && (
            <button
              onClick={() => setIsAddMode((v) => !v)}
              className={`absolute bottom-6 right-20 z-10 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all shadow-lg ${
                isAddMode
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "1rem" }}
              >
                {isAddMode ? "close" : "add"}
              </span>
              {isAddMode ? "Cancel" : "Add Salary"}
            </button>
          )}

          <GlobeMap
            countryGeoJSON={countryGeoJSON}
            cityGeoJSON={cityGeoJSON}
            onLoad={handleMapLoad}
            onMoveEnd={handleMoveEnd}
            onIdle={handleIdle}
            onCountryClick={handleCountryClick}
            onCityClick={handleCityClick}
            isAddMode={isAddMode}
            onAddClick={handleAddClick}
          />

          <DashboardSidebar
            country={selectedCountry}
            city={selectedCity}
            onClose={handleClose}
            filters={filters}
          />
        </div>
      </main>

      {pendingLocation && (
        <CreateRecordModal
          countryName={pendingLocation.countryName}
          countryId={pendingLocation.countryId}
          initialCity={pendingLocation.cityName}
          onClose={() => setPendingLocation(null)}
          onCreated={handleCreated}
        />
      )}
    </div>
  )
}
