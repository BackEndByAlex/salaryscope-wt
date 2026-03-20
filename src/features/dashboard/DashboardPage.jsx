import { useCallback } from "react"
import Map from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"

const CARTO_DARK = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

const INITIAL_VIEW = {
  longitude: 0,
  latitude: 20,
  zoom: 1.5,
}

export default function DashboardPage() {
  const handleMapLoad = useCallback((event) => {
    event.target.setProjection({ type: "globe" })
  }, [])

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      <LandingNav />

      <main className="flex-1 pt-16">
        <Map
          initialViewState={INITIAL_VIEW}
          mapStyle={CARTO_DARK}
          onLoad={handleMapLoad}
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
        />
      </main>
    </div>
  )
}
