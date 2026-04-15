# analytics/

Dataset-wide charts and statistics. Public — no login required.

---

## AnalyticsPage.jsx

Composes the full analytics view from chart components. Fires three separate GraphQL queries in parallel on mount so sections load independently:

```
ANALYTICS_OVERVIEW_QUERY   →  OverviewStats
  total records, countries, companies, job categories

ANALYTICS_CHARTS_QUERY     →  TopCountriesChart
                           →  TopCompaniesChart
                           →  JobCategoriesChart
  top 20 countries by record count
  top 20 companies by rating
  all job categories with job counts

ANALYTICS_BREAKDOWN_QUERY  →  BreakdownCharts
  record counts per experience level  (EN / MI / SE / EX)
  record counts per work setting      (Remote / Hybrid / In-person)
```

Each section renders a loading skeleton while its query is in flight. A slow chart query doesn't block the overview from showing.

---

## Sections

```
┌─────────────────────────────────────────┐
│  Dataset at a Glance                    │  ← OverviewStats
│  137k records · 100+ countries · ...    │
├─────────────────────────────────────────┤
│  Top Countries by Records               │  ← TopCountriesChart
│  ████████████ United States  45,000     │
│  ████████     Germany         8,200     │
├─────────────────────────────────────────┤
│  Top Rated Companies                    │  ← TopCompaniesChart
│  ★★★★★  Airbnb  · San Francisco        │
├─────────────────────────────────────────┤
│  Jobs by Category                       │  ← JobCategoriesChart
│  Data Science     ███  142 jobs         │
├─────────────────────────────────────────┤
│  Experience & Work Setting              │  ← BreakdownCharts
│  Senior  ████████  62%                  │
│  Remote  ██████    54%                  │
└─────────────────────────────────────────┘
```
