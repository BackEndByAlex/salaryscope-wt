---
sidebar_position: 3
sidebar_label: Chart Components
---

# components/charts/

Data visualization components for the analytics page. All components here are display-only — they receive data as props from `AnalyticsPage` and render it.

---

## OverviewStats.jsx

Four stat cards in a row — total salary records, countries, companies, and job categories. Reads from `ANALYTICS_OVERVIEW_QUERY` data.

---

## TopCountriesChart.jsx

Horizontal bar chart of the top 20 countries by salary record count. Each bar's width is proportional to the highest value in the set. Reads from `ANALYTICS_CHARTS_QUERY`.

---

## TopCompaniesChart.jsx

Ranked list of the top 20 companies by employer rating. Shows company name, country, and star rating. Data comes from the `salary_extra` dataset — the only one that includes company ratings.

---

## JobCategoriesChart.jsx

Shows the number of distinct job titles in each job category. Reads from `ANALYTICS_CHARTS_QUERY`. Useful for understanding which categories have the broadest variety of roles.

---

## BreakdownCharts.jsx

Two side-by-side panels using `ANALYTICS_BREAKDOWN_QUERY`:

**Experience level** — record counts for Entry / Mid / Senior / Executive  
**Work setting** — record counts for Remote / Hybrid / In-person

Each row is rendered by `StatBar` from `shared/components/ui/`. The bar width is proportional to the total so you can read relative distributions at a glance.
