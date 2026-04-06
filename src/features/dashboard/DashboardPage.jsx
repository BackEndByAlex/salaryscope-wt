import { useState, useCallback } from "react"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import GlobeMap from "../../shared/components/map/GlobeMap.jsx"
import DashboardSidebar from "./DashboardSidebar.jsx"
import { useGlobeData } from "../../shared/hooks/useGlobeData.js"

export default function DashboardPage() {
  const {
    countryGeoJSON,
    cityGeoJSON,
    handleMapLoad,
    handleMoveEnd,
    handleIdle,
  } = useGlobeData()

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  const handleCountryClick = useCallback((properties) => {
    setSelectedCountry(properties)
    setSelectedCity(null)
  }, [])

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

      <main className="flex-1 pt-16 relative">
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
        />
      </main>
    </div>
  )
}
