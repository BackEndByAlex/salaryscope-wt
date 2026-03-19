import { useRef, useCallback } from "react"
import Map from "react-map-gl/maplibre"

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

const INITIAL_VIEW = {
  longitude: 30,
  latitude: 45,
  zoom: 3.5,
}

export default function HeroSection() {
  const animationRef = useRef(null)
  const bearingRef = useRef(0)

  const handleLoad = useCallback((event) => {
    const map = event.target

    function rotate() {
      bearingRef.current = (bearingRef.current + 0.05) % 360
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
        inset: 1,
        zIndex: 2,
      }}
    >
      <Map
        initialViewState={INITIAL_VIEW}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        projection="globe"
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
        keyboard={false}
        touchZoomRotate={false}
        doubleClickZoom={false}
        onLoad={handleLoad}
        attributionControl={false}
      />
      {/* Overlay to keep hero text readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(14, 14, 14, 0.60)",
        }}
      />
    </div>
  )
}
