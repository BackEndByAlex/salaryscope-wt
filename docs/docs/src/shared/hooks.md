---
sidebar_position: 3
sidebar_label: Hooks
---

# hooks/

Custom React hooks shared across features.

---

## useAuth.js

Reads the current user from `AuthProvider`. Returns `{ user, setUser, loading }`.

Import this anywhere you need to check authentication state. Never read the context directly — this hook is the stable interface.

---

## useDashboardFilters.js

Manages all dashboard filter state by reading and writing URL search params. Filters are in the URL so they survive a page reload and can be copied as a link.

It exposes:

- `filters` — object with the current values: `{ experienceLevel[], workSetting[], employmentType[], workYear, companySize, companyId }`
- `activeCount` — total number of active filter values (used for the badge on the filter button)
- `toggle(key, value)` — adds or removes a value from a multi-select filter, or flips a single-value filter on/off
- `clear()` — removes all filters at once
- `clearFilter(key)` — removes one specific filter key

Multi-select keys store comma-separated values in the URL:

```
?exp=EN,SE&setting=In-person&year=2023
   ↓
filters.experienceLevel  →  ["EN", "SE"]
filters.workSetting      →  ["In-person"]
filters.workYear         →  2023
```

---

## useFilterOptions.js

Fetches the distinct filter option values for a selected region.

```
useFilterOptions({ countryId, cityId })
  └── if no region selected → skips query, returns empty arrays
  └── if region selected → fires filterOptions(countryId, cityId)
        returns values that actually exist in that region's data:
          experienceLevels, workSettings, employmentTypes, companySizes, workYears
```

Scoping options to the selected region means the user never sees checkboxes that would return zero results.

---

## useGlobeData.js

All the data and event logic for the 3D globe. This hook separates the complex map state management from the `GlobeMap` rendering component.

It manages several parallel state stores:

```
countryIndexRef     id → API country record
cityIndexRef        id → API city record
countryPositionsRef id → { id, name, coordinates }  (accumulated from tiles)
cityPositionsRef    name.toLowerCase() → [lon, lat]  (accumulated from tiles)
```

The position caches accumulate as the user pans — country dots that scroll off screen don't disappear when tiles reload.

Event handlers returned to `GlobeMap`:

**`handleMapLoad`** — saves the map instance, sets projection to globe mode, calls `discoverLayers(map)`, patches `map.easeTo` to strip the `around` option (prevents a MapLibre bug with globe mode).

**`handleMoveEnd`** — fires when the camera stops moving. If zoom ≥ 3.0, finds the country closest to the map center and sets it as `focusedCountryId` — this triggers the Apollo city query to start fetching in parallel with tile loading.

**`handleIdle`** — fires when tiles have fully loaded. Scans rendered tile features, matches them against the country/city indexes, and rebuilds the GeoJSON dot layers. Also accumulates new city positions into the persistent cache.

**`refetchCities`** — exposed so `DashboardPage` can call it after a new salary record is created. Re-fires `CITIES_QUERY`, updates `cityIndexRef`, and the next `handleIdle` scan places the new dot on the map.

**`getCountryIdByName(name)`** — looks up a country ID from the full `countryIndexRef`. Used by `DashboardPage` to resolve the country ID after a BigDataCloud reverse geocode result before opening `CreateRecordModal`.

---

## useResizable.js

Makes a panel resizable by dragging an edge. Used by both sidebars on the dashboard.

Takes `{ defaultWidth, min, max, direction }` and returns `{ width, handlePointerDown }`.  
Attach `handlePointerDown` to a drag handle element and `width` to the panel's inline `style.width`.

---

## useSearch.js

Debounced Elasticsearch search hook. Wraps `SEARCH_RECORDS_QUERY` with a 300ms debounce so a new network request is only fired once the user stops typing.

- `query` / `setQuery` — the raw input value (bind to the search field)
- `results` — array of matching salary records from the last settled query
- `totalCount` — total matches across all pages
- `loading` — true while the query is in flight
- `clear()` — resets both the input and the last results

The query only fires when the debounced value is at least 2 characters. Shorter inputs return an empty result without touching the network. Used inside `DashboardFilterSidebar` to drive the searchable company filter.
