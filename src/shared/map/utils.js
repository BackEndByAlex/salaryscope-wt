import {
  EMPTY_GEOJSON,
  CARTO_COUNTRY_LAYERS,
  CARTO_CITY_LAYERS,
} from "./constants.js"

// Reads the loaded CARTO style and fills the layer ID arrays used by
// queryRenderedFeatures. Must be called once in the map onLoad handler.
export function discoverLayers(map) {
  const layers = map.getStyle()?.layers ?? []

  const countryLayers = layers
    .filter(
      (l) =>
        l.type === "symbol" &&
        l["source-layer"] === "place" &&
        JSON.stringify(l.filter ?? []).includes('"country"'),
    )
    .map((l) => l.id)

  const cityLayers = layers
    .filter(
      (l) =>
        l.type === "symbol" &&
        l["source-layer"] === "place" &&
        JSON.stringify(l.filter ?? []).includes('"city"'),
    )
    .map((l) => l.id)

  // Mutate the exported arrays so all consumers see the updated IDs
  CARTO_COUNTRY_LAYERS.splice(0, CARTO_COUNTRY_LAYERS.length, ...countryLayers)
  CARTO_CITY_LAYERS.splice(0, CARTO_CITY_LAYERS.length, ...cityLayers)
}

// ── Index builders ───────────────────────────────────────────────────────────

export function buildCountryIndex(countries) {
  const index = new Map()
  for (const c of countries) {
    index.set(c.name.toLowerCase(), c)
  }
  return index
}

export function buildCityIndex(cities) {
  const index = new Map()
  for (const c of cities) {
    index.set(c.name.toLowerCase(), c)
  }
  return index
}

// ── GeoJSON builders ─────────────────────────────────────────────────────────

export function extractCountryGeoJSON(map, countryIndex) {
  if (countryIndex.size === 0) return EMPTY_GEOJSON

  const features = map.queryRenderedFeatures(null, {
    layers: CARTO_COUNTRY_LAYERS,
  })
  const seen = new Set()
  const result = []

  for (const f of features) {
    const nameEn = f.properties?.name_en
    if (!nameEn || seen.has(nameEn)) continue
    seen.add(nameEn)

    const api = countryIndex.get(nameEn.toLowerCase())
    if (!api) continue

    result.push({
      type: "Feature",
      geometry: f.geometry,
      properties: {
        id: api.id,
        name: api.name,
        count: api.employeeRecordCount ?? 0,
      },
    })
  }

  return { type: "FeatureCollection", features: result }
}

// Builds city GeoJSON from the accumulated tile-position cache.
// Uses cached coordinates so dots never disappear when tiles reload during panning.
export function buildCityGeoJSONFromCache(positionsMap, cityIndex) {
  if (cityIndex.size === 0) return EMPTY_GEOJSON
  const features = []
  for (const [nameLower, city] of cityIndex) {
    const coords = positionsMap.get(nameLower)
    if (!coords) continue
    features.push({
      type: "Feature",
      geometry: { type: "Point", coordinates: coords },
      properties: { id: city.id, name: city.name },
    })
  }
  return { type: "FeatureCollection", features }
}

// ── Focus detection ──────────────────────────────────────────────────────────

// Returns the country whose cached centroid is closest to the map center.
// positionsMap: Map<id, { id, name, coordinates: [lon, lat] }>
export function findFocusedCountry(positionsMap, center) {
  let closest = null
  let minDist = Infinity
  for (const entry of positionsMap.values()) {
    const [lon, lat] = entry.coordinates
    const dist = (lon - center.lng) ** 2 + (lat - center.lat) ** 2
    if (dist < minDist) {
      minDist = dist
      closest = entry
    }
  }
  return closest
}
