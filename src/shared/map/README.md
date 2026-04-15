# map/

MapLibre GL configuration for the globe — constants, layer definitions, and the utility functions that wire map tiles to API data.

---

## constants.js

Values shared across the map module:

**`CARTO_DARK`** — the Carto dark-matter base map style URL. This controls what the globe looks like before any data is overlaid.

**`INITIAL_VIEW`** — `{ longitude: 0, latitude: 20, zoom: 1.5 }` — the camera position when the map first loads. Centered at 0°/20° so the Atlantic is visible and no single country dominates.

**`CITY_ZOOM_THRESHOLD`** — `3.0`. Below this zoom level only country dots are shown. At or above it, city dots appear and the city data fetch fires. Controls the zoom at which the map switches resolution.

**`EMPTY_GEOJSON`** — an empty `FeatureCollection`. Used as the default value for `countryGeoJSON` and `cityGeoJSON` before any data loads, so the GeoJSON source always has a valid value.

**`CARTO_COUNTRY_LAYERS`** / **`CARTO_CITY_LAYERS`** — start as empty arrays, populated at runtime by `discoverLayers()` once the map has loaded its tiles. Used by `queryRenderedFeatures()` to scan only the relevant layers.

---

## layers.js

MapLibre layer definitions for the dots drawn on top of the base map. Defines two things:

1. A GeoJSON source for country dots and one for city dots
2. Circle layer specs for each — color, radius, and how they respond to zoom

These layer objects are passed to the map instance when it loads and updated whenever the GeoJSON data changes.

---

## utils.js

Helper functions that power `useGlobeData`. None of these functions hold state — they are pure transformations called from the hook.

**`discoverLayers(map)`**  
Inspects the loaded style layers to find which ones come from Carto's country and city tile sources. Writes the found layer names into `CARTO_COUNTRY_LAYERS` / `CARTO_CITY_LAYERS`. Called once on `handleMapLoad`.

**`buildCountryIndex(countries)`**  
Takes the API's country list and returns a `Map<normalizedName, countryRecord>`. The normalized name matches how Carto labels features in tiles, so lookups are a single map get.

**`buildCityIndex(cities)`**  
Same pattern for cities.

**`extractCountryGeoJSON(map, index)`**  
Calls `map.queryRenderedFeatures(null, { layers: CARTO_COUNTRY_LAYERS })` to get currently visible tile features, matches each to the country index, and returns a GeoJSON `FeatureCollection` with `id` and `name` attached as feature properties. Called on every `idle` event.

**`buildCityGeoJSONFromCache(positionCache, index)`**  
Builds city GeoJSON from the accumulated position cache (not just currently visible tiles). This is why city dots don't disappear when the user pans — positions are remembered once seen.

**`findFocusedCountry(positionCache, center)`**  
Finds the country in the position cache whose recorded coordinates are closest to the current map center. Used by `handleMoveEnd` to determine which country's cities to fetch next.

---

## GlobeMap — add mode

`GlobeMap` accepts two optional props that enable the "click to add salary" flow:

- **`isAddMode`** — when `true`, the cursor changes to a crosshair and map clicks are intercepted before the normal country-select logic runs
- **`onAddClick(countryName, countryId, cityName)`** — called by `GlobeMap` after a click is resolved to a location

When the user clicks the map in add mode:

1. The click's `lngLat` is sent to [BigDataCloud's reverse geocode API](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api) — a free, no-API-key, CORS-enabled endpoint that returns `{ city, countryName }` for any coordinate
2. The returned `countryName` is matched against `countryGeoJSON.features` to find the API's country ID
3. `onAddClick` is called with the resolved country name, country ID, and city name
4. `DashboardPage` receives the call and opens `CreateRecordModal` pre-filled with the location

If the click hits open ocean (no country detected) the flow is silently cancelled.
