---
sidebar_position: 4
sidebar_label: Sidebar Components
---

# components/sidebar/

The dashboard right-panel components — salary list, individual row, stats header, and section wrapper.

---

## SalaryList.jsx

Paginated salary records for a selected country or city, filtered by whatever the user has active on the left sidebar.

It does three things:

**1. Query the API**  
Fires `SALARY_LIST_QUERY` with `countryId` / `cityId` and all active filter variables. Single-value filters are sent directly to the API. Two or more values for the same dimension are sent as null — the API returns a broader set and the client filters it.

```
filters.experienceLevel = ["EN"]       →  API gets experienceLevel: "EN"
filters.experienceLevel = ["EN", "SE"] →  API gets experienceLevel: null
                                           client filters the page client-side
```

**2. Salary range slider**  
A dual-thumb slider built from scratch using pointer events. The range is derived from the loaded records — min and max computed from `salaryInUsd ?? salary`. Dragging either thumb filters the visible list client-side without a new API call.

The range resets when the selected location changes. It does not reset when other filters change — this is intentional so you can combine the slider with other filters.

**3. Pagination**  
A "Load more" button calls `fetchMore` with the current offset, and the result is merged into the existing records list using `updateQuery`. The list grows in place without re-fetching earlier pages.

---

## SalaryRow.jsx

A single record in the salary list. Displays: job title, salary (right-aligned), experience level badge (color-coded), work setting, work year.

**Salary display logic:**

```
salaryInUsd is set    →  "$45k"         (Dataset A — jobs_in_data, h1b_visa)
only salary is set    →  "45k EUR"      (EU survey, salary_extra)
both are null         →  "—"
```

Experience level badges handle both formats — short codes (`EN`, `SE`) and full strings (`Entry-level`, `Senior`) both map to the same label and color.

---

## SidebarStats.jsx

Breakdown stats at the top of the right panel. Fires `COUNTRY_SIDEBAR_QUERY` or `CITY_SIDEBAR_QUERY` for the selected location. Uses GraphQL aliases to fetch eight counts in a single request:

```
total     → total records for this location
entry     → records with experienceLevel "EN"
mid       → records with experienceLevel "MI"
remote    → records with workSetting "Remote"
inPerson  → records with workSetting "In-person"
```

These counts are not affected by the active filters — they show the full picture of what data exists for the location.

---

## SidebarSection.jsx

A simple wrapper with a small uppercase label above its children. Used to visually group content inside the sidebar. No logic.
