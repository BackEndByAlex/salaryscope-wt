import { useRef, useCallback } from "react"
import Map, { Marker } from "react-map-gl/maplibre"

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

const INITIAL_VIEW = {
  longitude: 16.3528,
  latitude: 56.6634,
  zoom: 6.5,
  pitch: 30,
  padding: { left: 600, right: 0, top: 0, bottom: 0 },
}

const KALMAR_LNG = 16.2528
const KALMAR_LAT = 56.6634

export default function RegisterBackground() {
  const animationRef = useRef(null)
  const bearingRef = useRef(0)

  const handleLoad = useCallback((event) => {
    const map = event.target

    function rotate() {
      bearingRef.current = (bearingRef.current + 0.01) % 360
      map.rotateTo(bearingRef.current, { duration: 0 })
      animationRef.current = requestAnimationFrame(rotate)
    }

    animationRef.current = requestAnimationFrame(rotate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <Map
        initialViewState={INITIAL_VIEW}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
        keyboard={false}
        touchZoomRotate={false}
        doubleClickZoom={false}
        onLoad={handleLoad}
        attributionControl={false}
      >
        <Marker longitude={KALMAR_LNG} latitude={KALMAR_LAT} anchor="center">
          <div style={{ position: "relative", width: 12, height: 12 }}>
            {/* Outer pulse ring */}
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(129, 236, 255, 0.4)",
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
            {/* Inner dot */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#81ecff",
                boxShadow: "0 0 12px rgba(129, 236, 255, 0.8)",
              }}
            />
          </div>
        </Marker>
      </Map>

      {/* Dark gradient overlay to keep card readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(14,14,14,0.75) 100%)",
        }}
      />
    </div>
  )
}
