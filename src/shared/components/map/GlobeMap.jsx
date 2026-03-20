import { useRef } from "react"
import MapGL, { Source, Layer } from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import { CARTO_DARK, INITIAL_VIEW } from "../../map/constants.js"
import {
  countryCircleLayer,
  countryNameLayer,
  countryCountLayer,
  cityCircleLayer,
  cityNameLayer,
  cityCountLayer,
} from "../../map/layers.js"

export default function GlobeMap({
  countryGeoJSON,
  cityGeoJSON,
  onLoad,
  onMoveEnd,
  onIdle,
}) {
  const mapRef = useRef(null)

  return (
    <MapGL
      ref={mapRef}
      initialViewState={INITIAL_VIEW}
      mapStyle={CARTO_DARK}
      onLoad={onLoad}
      onMoveEnd={onMoveEnd}
      onIdle={onIdle}
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
