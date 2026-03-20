export const CARTO_DARK =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

export const INITIAL_VIEW = { longitude: 0, latitude: 20, zoom: 1.5 }

export const CITY_ZOOM_THRESHOLD = 3.0

export const EMPTY_GEOJSON = { type: "FeatureCollection", features: [] }

// Filled at runtime by discoverLayers() — see utils.js
export let CARTO_COUNTRY_LAYERS = []
export let CARTO_CITY_LAYERS = []
