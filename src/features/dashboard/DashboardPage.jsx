import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import GlobeMap from "../../shared/components/map/GlobeMap.jsx"
import { useGlobeData } from "../../shared/hooks/useGlobeData.js"

export default function DashboardPage() {
  const {
    countryGeoJSON,
    cityGeoJSON,
    handleMapLoad,
    handleMoveEnd,
    handleIdle,
  } = useGlobeData()

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      <LandingNav />

      <main className="flex-1 pt-16">
        <GlobeMap
          countryGeoJSON={countryGeoJSON}
          cityGeoJSON={cityGeoJSON}
          onLoad={handleMapLoad}
          onMoveEnd={handleMoveEnd}
          onIdle={handleIdle}
        />
      </main>
    </div>
  )
}
