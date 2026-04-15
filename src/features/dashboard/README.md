# dashboard/

The core of the app. An interactive 3D globe where you explore salary data by clicking countries and cities.

---

## DashboardPage.jsx

Top-level layout. Holds two pieces of shared state:

- **Selected location** — which country or city the user clicked on the globe (local React state)
- **Active filters** — what filters are currently applied (`useDashboardFilters`, stored in the URL)

It composes three things side by side and passes state between them:

```
┌─────────────────────┬─────────────────────────────────┐
│  DashboardFilter-   │         GlobeMap       ┌────────│
│  Sidebar            │                        |        │
│  (filter controls)  │  (interactive 3D globe)|        │
│                     │                        |        |
│  useFilterOptions   │                        │  Dash- │
│  (options for the   │                        │  board │
│  selected region)   │                        │  Side- │
│                     │                        │  bar   │
└─────────────────────┴────────────────────────┴────────┘
```

When the user clicks a different country on the globe while a company filter is active, the company filter is cleared automatically — because that company might not exist in the new country.

---

## DashboardFilterSidebar.jsx

The left panel. Renders six collapsible filter sections populated from the API:

```
Experience Level   →  EN / MI / SE / EX  (short codes + full strings both handled)
Work Setting       →  Remote / Hybrid / In-person
Employment Type    →  FT / PT / CT / FL
Company Size       →  S / M / L
Year               →  2020 – 2024
Company            →  searchable list, scoped to the selected country
```

Filter options are loaded by `useFilterOptions(countryId, cityId)` — they only show values that actually exist in the data for the selected region. If no region is selected the filter list is empty.

Each click calls `toggle(key, value)` from `useDashboardFilters`, which writes the new state to the URL. The URL is the source of truth — refreshing the page preserves all filters.

---

## DashboardSidebar.jsx

The right panel. Slides in from the right when a country or city is clicked on the globe.

Two sections:

**1. Breakdown stats** (top)  
Fires `COUNTRY_SIDEBAR_QUERY` or `CITY_SIDEBAR_QUERY` for the selected location. Shows total record count plus splits by experience level and work setting. These counts respect the selected region but not the active filters — they give a full picture of what data exists.

**2. Salary records** (bottom)  
Renders `SalaryList` with the selected country/city ID and all active filters. This is the paginated list of actual records, filtered to match what the user selected.

The sidebar is resizable — drag its left edge to make it wider or narrower.

---

## Filter data flow

```
useDashboardFilters()
  reads/writes URL search params  (?exp=EN&setting=In-person)
         │
         ├──► DashboardFilterSidebar
         │      useFilterOptions(selectedCountryId)
         │        └── filterOptions query → distinct values for that region
         │              → renders checkboxes with active state from URL
         │
         └──► DashboardSidebar → SalaryList
                SALARY_LIST_QUERY(countryId, offset, ...filters)
                  └── single value per dimension → sent to API as filter
                      two or more values → sent as null, applied client-side
```

Storing filters in the URL means they survive page reload, can be bookmarked, and can be shared as a link.
