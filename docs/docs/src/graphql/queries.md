---
sidebar_position: 2
sidebar_label: Queries
---

# queries/

Read-only GraphQL queries. Each file groups the queries used by one part of the app.

---

## auth.js

**`ME_QUERY`** — fetches `{ id, email }` for the current session.  
Used twice: by `AuthProvider` on mount to restore session state, and by `ProfilePage` to show user details (`fetchPolicy: "network-only"` in the latter so it always goes to the server).

**`ME_WITH_RECORDS_QUERY`** — extends `ME_QUERY` with the full `salaryRecords` array for the logged-in user. Each record includes job title, city, employee country, salary, currency, work year, experience level, and work setting. Used by `UserRecords` on the profile page with `fetchPolicy: "network-only"` so the list is always fresh after creates, updates, or deletes.

---

## home.js

Queries for the landing page stats section — total record count, number of countries, and other dataset summary numbers shown in `StatsSection`.

---

## sidebar.js

Three queries for the dashboard right panel.

**`COUNTRY_SIDEBAR_QUERY`** — breakdown counts for a country. Runs eight parallel alias queries in a single request: total records plus one count per experience level (EN/MI/SE/EX) and one per work setting (Remote/Hybrid/In-person). Used by `SidebarStats`.

**`CITY_SIDEBAR_QUERY`** — same breakdown but scoped to a city.

**`SALARY_LIST_QUERY`** — paginated salary records for a country or city. Accepts the full set of filter variables and returns `salary`, `salaryCurrency`, `salaryInUsd`, job title, work setting, work year, and employment type per record. Used by `SalaryList`.

---

## filterOptions.js

**`FILTER_OPTIONS_QUERY`** — returns the distinct values available for each filter dimension scoped to a country or city:

```
filterOptions(countryId, cityId) → {
  experienceLevels   ["EN", "MI", "SE", "EX"]
  workSettings       ["Remote", "Hybrid", "In-person"]
  employmentTypes    ["FT", "PT", "CT", "FL"]
  companySizes       ["S", "M", "L"]
  workYears          [2024, 2023, 2022, ...]
}
```

Used by `DashboardFilterSidebar` to show only the values that actually exist in the data for the selected region.

---

## analytics.js

Three queries for the analytics page, fired in parallel so sections load independently:

**`ANALYTICS_OVERVIEW_QUERY`** — total counts for salary records, countries, companies, and job categories.

**`ANALYTICS_CHARTS_QUERY`** — top 20 countries (by record count), top 20 companies (by rating), and all job categories with job counts.

**`ANALYTICS_BREAKDOWN_QUERY`** — record counts per experience level and work setting. Uses aliases to batch eight count queries into one request:

```graphql
entry:    salaryRecords(filters: { experienceLevel: "EN", limit: 1 }) { totalCount }
mid:      salaryRecords(filters: { experienceLevel: "MI", limit: 1 }) { totalCount }
remote:   salaryRecords(filters: { workSetting: "Remote", limit: 1 }) { totalCount }
inPerson: salaryRecords(filters: { workSetting: "In-person", limit: 1 }) { totalCount }
# ...and so on
```

---

## countries.js

**`COUNTRIES_QUERY`** — all countries with id, name, and record count. Used by `useGlobeData` to build the lookup index for placing country dots on the globe.

---

## companies.js

**`COMPANIES_FILTER_QUERY`** — companies scoped to a given country. Used by the company search filter inside `DashboardFilterSidebar`.

---

## cities.js

**`CITIES_QUERY`** — cities for a specific country (requires `countryId`). Used by `useGlobeData` to place city dots when the user zooms in past the city zoom threshold (zoom ≥ 3.0).

---

## search.js

**`SEARCH_RECORDS_QUERY`** — full-text search across all salary records via Elasticsearch.

```graphql
searchRecords(query: String!, limit: Int, offset: Int) {
  records {
    id, jobTitle, jobCategory, country, countryId,
    city, cityId, salary, salaryInUsd,
    experienceLevel, workSetting, workYear, source
  }
  totalCount
  hasNextPage
}
```

Used by `useSearch` (and through it by the company search inside `DashboardFilterSidebar`). Queries are fired with `fetchPolicy: "network-only"` so results always come from the server, never from cache.
