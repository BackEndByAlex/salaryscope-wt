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

Multi-select keys (`exp`, `setting`, `type`) store comma-separated values in the URL:

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

**`handleMapLoad`**
1. Saves the map instance
2. Sets projection to globe mode
3. Calls `discoverLayers(map)` to identify which Carto tile layers contain countries and cities
4. Patches `map.easeTo` to strip the `around` option (prevents a MapLibre bug with globe mode)

**`handleMoveEnd`**
Fires when the camera stops moving. If zoom ≥ 3.0, finds the country closest to the map center and sets it as `focusedCountryId` — this triggers the Apollo city query to start fetching in parallel with tile loading (before `idle` fires).

**`handleIdle`**
Fires when tiles have fully loaded. Scans rendered tile features, matches them against the country/city indexes using the name lookup maps, and rebuilds the GeoJSON dot layers. Also accumulates new city positions into the persistent cache.

**`refetchCities`** — returned alongside the event handlers. Exposed so `DashboardPage` can call it after a new salary record is created. If the record included a new city that didn't previously exist in the database, calling `refetchCities()` re-fires `CITIES_QUERY`, updates `cityIndexRef`, and the next `handleIdle` scan will place the new dot on the map.

---

## useResizable.js

Makes a panel resizable by dragging an edge. Used by both sidebars on the dashboard.

Takes `{ defaultWidth, min, max, direction }` and returns `{ width, handlePointerDown }`.  
Attach `handlePointerDown` to a drag handle element and `width` to the panel's inline `style.width`.
