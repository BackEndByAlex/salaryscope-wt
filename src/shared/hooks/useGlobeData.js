import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "@apollo/client/react"
import { COUNTRIES_QUERY } from "../../graphql/queries/countries.js"
import { CITIES_QUERY } from "../../graphql/queries/cities.js"
import {
  EMPTY_GEOJSON,
  CITY_ZOOM_THRESHOLD,
  CARTO_CITY_LAYERS,
} from "../map/constants.js"
import {
  discoverLayers,
  buildCountryIndex,
  buildCityIndex,
  extractCountryGeoJSON,
  buildCityGeoJSONFromCache,
  findFocusedCountry,
} from "../map/utils.js"

const COUNTRY_NAME_ALIASES = {
  "united states of america": "united states",
  "united kingdom of great britain and northern ireland": "united kingdom",
  "russian federation": "russia",
  "republic of korea": "south korea",
  "viet nam": "vietnam",
  "czechia": "czech republic",
  "islamic republic of iran": "iran",
  "bolivarian republic of venezuela": "venezuela",
  "plurinational state of bolivia": "bolivia",
  "lao people's democratic republic": "laos",
  "syrian arab republic": "syria",
  "republic of moldova": "moldova",
  "democratic people's republic of korea": "north korea",
}

export function useGlobeData() {
  const mapInstanceRef = useRef(null)
  const countryIndexRef = useRef(new Map())
  const cityIndexRef = useRef(new Map())
  // Accumulates country positions as they appear in tiles — persists across zoom levels
  const countryPositionsRef = useRef(new Map()) // id → { id, name, coordinates }
  // Accumulates city tile positions for the focused country — cleared on country switch
  const cityPositionsRef = useRef(new Map()) // name.toLowerCase() → [lon, lat]

  const [countryGeoJSON, setCountryGeoJSON] = useState(EMPTY_GEOJSON)
  const [cityGeoJSON, setCityGeoJSON] = useState(EMPTY_GEOJSON)
  const [focusedCountryId, setFocusedCountryId] = useState(null)

  const { data: countryData } = useQuery(COUNTRIES_QUERY)
  const { data: cityData, refetch: refetchCities } = useQuery(CITIES_QUERY, {
    skip: !focusedCountryId,
    variables: { countryId: focusedCountryId },
  })

  // Build country index when API data arrives
  useEffect(() => {
    const countries = countryData?.countries?.countries ?? []
    countryIndexRef.current = buildCountryIndex(countries)
    const map = mapInstanceRef.current
    if (map) {
      setCountryGeoJSON(extractCountryGeoJSON(map, countryIndexRef.current))
    }
  }, [countryData])

  // Build city index when API data arrives, then redraw from position cache
  useEffect(() => {
    const cities = cityData?.cities?.cities ?? []
    cityIndexRef.current = buildCityIndex(cities)
    setCityGeoJSON(
      buildCityGeoJSONFromCache(cityPositionsRef.current, cityIndexRef.current),
    )
  }, [cityData])

  // onMoveEnd: detect focused country immediately so Apollo fetch starts in
  // parallel with tile loading — don't wait for idle
  const handleMoveEnd = useCallback(() => {
    const map = mapInstanceRef.current
    if (!map) return

    const zoom = map.getZoom()

    if (zoom >= CITY_ZOOM_THRESHOLD) {
      const focused = findFocusedCountry(
        countryPositionsRef.current,
        map.getCenter(),
      )
      if (focused) {
        setFocusedCountryId((prev) => {
          if (prev !== focused.id) {
            cityPositionsRef.current.clear()
          }
          return focused.id
        })
      }
    } else {
      setFocusedCountryId(null)
      cityPositionsRef.current.clear()
      setCityGeoJSON(EMPTY_GEOJSON)
    }
  }, [])

  // onIdle: tiles are fully loaded — scan positions and draw dots
  const handleIdle = useCallback(() => {
    const map = mapInstanceRef.current
    if (!map) return

    const zoom = map.getZoom()

    // Refresh country dots and accumulate positions into the persistent map
    const newCountryGeoJSON = extractCountryGeoJSON(
      map,
      countryIndexRef.current,
    )
    setCountryGeoJSON(newCountryGeoJSON)

    for (const f of newCountryGeoJSON.features) {
      const { id, name } = f.properties
      if (!countryPositionsRef.current.has(id)) {
        countryPositionsRef.current.set(id, {
          id,
          name,
          coordinates: f.geometry.coordinates,
        })
      }
    }

    if (zoom >= CITY_ZOOM_THRESHOLD) {
      // Accumulate newly visible city tile positions into the persistent cache
      const tileFeatures = map.queryRenderedFeatures(null, {
        layers: CARTO_CITY_LAYERS,
      })
      for (const f of tileFeatures) {
        const nameEn = f.properties?.name_en
        if (nameEn && !cityPositionsRef.current.has(nameEn.toLowerCase())) {
          cityPositionsRef.current.set(
            nameEn.toLowerCase(),
            f.geometry.coordinates,
          )
        }
      }

      // Build from the full cache — dots never disappear just because tiles reload
      setCityGeoJSON(
        buildCityGeoJSONFromCache(
          cityPositionsRef.current,
          cityIndexRef.current,
        ),
      )
    }
  }, [])

  const handleMapLoad = useCallback((event) => {
    const map = event.target
    mapInstanceRef.current = map

    map.setProjection({ type: "globe" })
    discoverLayers(map)

    const originalEaseTo = map.easeTo.bind(map)
    map.easeTo = (options, eventData) => {
      const { around, ...rest } = options ?? {}
      return originalEaseTo(rest, eventData)
    }

    setCountryGeoJSON(extractCountryGeoJSON(map, countryIndexRef.current))
  }, [])

  const getCountryIdByName = useCallback((name) => {
    const entry = countryIndexRef.current.get(name.toLowerCase())
    return entry?.id ?? null
  }, [])

  return {
    countryGeoJSON,
    cityGeoJSON,
    handleMapLoad,
    handleMoveEnd,
    handleIdle,
    refetchCities,
    getCountryIdByName,
  }
}
