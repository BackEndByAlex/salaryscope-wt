import { useState, useCallback } from "react"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import GlobeMap from "../../shared/components/map/GlobeMap.jsx"
import MobileFilterToggle from "../../shared/components/dashboard/MobileFilterToggle.jsx"
import AddModeBanner from "../../shared/components/dashboard/AddModeBanner.jsx"
import AddSalaryButton from "../../shared/components/dashboard/AddSalaryButton.jsx"
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
  const [filterOpen, setFilterOpen] = useState(false)

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
    <div className="h-dvh flex flex-col bg-surface overflow-hidden">
      <LandingNav />

      <main className="flex-1 pt-16 flex overflow-hidden">
        {/* Mobile backdrop — closes filter drawer on tap */}
        {filterOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/50"
            onClick={() => setFilterOpen(false)}
          />
        )}

        <DashboardFilterSidebar
          filters={filters}
          activeCount={activeCount}
          onToggle={toggle}
          onClear={clear}
          selectedCountryId={selectedCountry?.id ?? null}
          selectedCityId={selectedCity?.id ?? null}
          onSearchSelect={handleSearchSelect}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1 relative">
          <MobileFilterToggle
            onClick={() => setFilterOpen(true)}
            activeCount={activeCount}
          />

          {isAddMode && <AddModeBanner />}

          {user && (
            <AddSalaryButton
              isAddMode={isAddMode}
              onClick={() => setIsAddMode((v) => !v)}
            />
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
