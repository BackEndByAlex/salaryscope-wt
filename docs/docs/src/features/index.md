---
sidebar_position: 1
sidebar_label: Overview
---

# features/

Feature-based architecture. Each folder owns its UI, its data fetching, and its local state together in one place.

The rule is simple: if a component is only used by one feature, it lives inside that feature's folder. It only moves to `shared/` when two or more features need it. This makes it easy to find everything related to a domain without jumping across the codebase.

---

```
features/
├── auth/         Login, register, OAuth flow, session management
├── dashboard/    Interactive globe map + salary records + filters
├── analytics/    Dataset-wide charts and statistics
├── landing/      Public landing page
└── profile/      Authenticated user profile and submitted records
```

---

## Features at a glance

**`auth/`** — Everything about who the user is. Handles email/password login and registration, the two-step OAuth flow with Google and GitHub, the session cookie, and the route guards that protect or redirect based on auth state.

**`dashboard/`** — The core of the app. A 3D globe where you click countries and cities to see salary breakdowns. A left sidebar with filter controls. A right sidebar with a paginated salary list and a range slider.

**`analytics/`** — A static analytics view with five sections: dataset overview, top countries, top rated companies, job categories, and experience/work-setting breakdowns. No interactivity — just queries and charts.

**`landing/`** — The public home page with hero, stats, features, and CTA sections. Minimal logic.

**`profile/`** — The authenticated user's page. Shows their identity, linked OAuth providers, and any salary records they have submitted.
