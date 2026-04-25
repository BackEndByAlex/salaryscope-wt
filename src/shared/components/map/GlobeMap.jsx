import { useRef, useState, useCallback } from "react"
import MapGL, { Source, Layer } from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import { CARTO_DARK, INITIAL_VIEW } from "../../map/constants.js"
import { reverseGeocode } from "../../utils/reverseGeocode.js"
import {
  countryCircleLayer,
  countryNameLayer,
  countryCountLayer,
  cityCircleLayer,
  cityNameLayer,
  cityCountLayer,
} from "../../map/layers.js"

const INTERACTIVE_LAYERS = ["country-circles", "city-circles"]

export default function GlobeMap({
  countryGeoJSON,
  cityGeoJSON,
  onLoad,
  onMoveEnd,
  onIdle,
  onCountryClick,
  onCityClick,
  isAddMode = false,
  onAddClick,
}) {
  const mapRef = useRef(null)
  const [cursor, setCursor] = useState("grab")

  const handleClick = useCallback(
    async (e) => {
      if (isAddMode) {
        const { lat, lng } = e.lngLat
        const location = await reverseGeocode(lat, lng)
        if (!location?.countryName) return
        onAddClick?.(location.countryName, location.cityName, [lng, lat])
        return
      }

      const feature = e.features?.[0]
      if (!feature) return

      const [lng, lat] = feature.geometry.coordinates

      if (feature.layer.id === "country-circles") {
        mapRef.current?.flyTo({ center: [lng, lat], zoom: 5, duration: 1200 })
        onCountryClick?.(feature.properties)
      } else if (feature.layer.id === "city-circles") {
        mapRef.current?.flyTo({ center: [lng, lat], zoom: 10, duration: 1000 })
        onCityClick?.(feature.properties)
      }
    },
    [isAddMode, onAddClick, onCountryClick, onCityClick],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (isAddMode) {
        setCursor("crosshair")
        return
      }
      setCursor(e.features?.length > 0 ? "pointer" : "grab")
    },
    [isAddMode],
  )

  return (
    <MapGL
      ref={mapRef}
      initialViewState={INITIAL_VIEW}
      mapStyle={CARTO_DARK}
      onLoad={onLoad}
      onMoveEnd={onMoveEnd}
      onIdle={onIdle}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      interactiveLayerIds={INTERACTIVE_LAYERS}
      cursor={cursor}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
    >
      <Source id="countries" type="geojson" data={countryGeoJSON}>
        <Layer {...countryCircleLayer} />
        <Layer {...countryNameLayer} />
        <Layer {...countryCountLayer} />
      </Source>

      <Source id="cities" type="geojson" data={cityGeoJSON}>
        <Layer {...cityCircleLayer} />
        <Layer {...cityNameLayer} />
        <Layer {...cityCountLayer} />
      </Source>
    </MapGL>
  )
}
