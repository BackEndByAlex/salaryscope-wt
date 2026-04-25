---
sidebar_position: 2
sidebar_label: Route Map
---

# SalaryScope — Route Map

Architecture reference for the SalaryScope frontend (WT2).  
For setup and commands see [README.md](./README.md).

---

## How the app is wired together

```
Browser
  └── React SPA  (Vite dev server / static build)
        └── ApolloProvider  ←  lib/Apollo.js
              └── BrowserRouter
                    └── AuthProvider  ←  features/auth/AuthProvider.jsx
                          └── <Routes>  ←  App.jsx
```

Every component tree below `ApolloProvider` can fire GraphQL queries.  
Every component tree below `AuthProvider` knows who the logged-in user is.  
`App.jsx` defines all routes and wraps protected ones in route guards.

---

## Stack layers

```
src/pages/           ← one file per URL, just renders the feature below it
src/features/        ← business logic + page layout, owns both UI and data
src/shared/          ← anything used by 2+ features (components, hooks, map)
src/graphql/         ← GQL documents only — no logic, no components
src/lib/             ← Apollo Client instance, configured once
```

---

## Route table

![Route Table](/img/diagrams/02-route-table.svg)

| URL              | Page            | Feature                   | Who can access                                                |
| ---------------- | --------------- | ------------------------- | ------------------------------------------------------------- |
| `/`              | `Home.jsx`      | `landing/LandingPage`     | Everyone                                                      |
| `/login`         | `Login.jsx`     | `auth/LoginPage`          | Guests only — redirects logged-in users to `/dashboard`       |
| `/register`      | `Register.jsx`  | `auth/RegisterPage`       | Guests only                                                   |
| `/profile`       | `Profile.jsx`   | `profile/ProfilePage`     | Logged-in users only — redirects guests to `/login`           |
| `/dashboard`     | `Dashboard.jsx` | `dashboard/DashboardPage` | Everyone (public data)                                        |
| `/analytics`     | `Analytics.jsx` | `analytics/AnalyticsPage` | Everyone (public data)                                        |
| `/auth/callback` | _(no page)_     | `auth/OAuthCallback`      | OAuth redirect target — visited by the provider, not the user |

Dashboard and Analytics are intentionally public. Salary data is browsable without an account.

---

## Request lifecycle

Every GraphQL request follows the same path:

```
1. Component renders → useQuery / useMutation fires
2. Apollo Client adds credentials: "include" to the request
   (browser attaches the session cookie automatically)
3. POST /graphql → API
4. Response cached in InMemoryCache
5. Component re-renders with data
```

On first load, `AuthProvider` fires a `me` query to check for an active session.  
A 401 back from `me` is normal — it just means no one is logged in yet.

---

## OAuth 2-step flow

```
User clicks "Sign in with Google"
  │
  ▼
OAuthButtons
  ├── generates PKCE codeVerifier + codeChallenge  (pkce.js)
  ├── calls beginGoogleLogin mutation with codeChallenge
  │     └── API sets signed HttpOnly state cookie
  │         returns authUrl
  ├── stores codeVerifier + provider in sessionStorage
  └── redirects browser to authUrl (Google login page)

Google redirects to /auth/callback?code=...&state=...
  │
  ▼
OAuthCallback
  ├── reads code + state from URL
  ├── reads codeVerifier + provider from sessionStorage
  ├── calls googleLogin mutation  (code + codeVerifier + state)
  │     └── API verifies state cookie with timingSafeEqual
  │         exchanges code for access token
  │         sets session cookie
  │         returns user
  ├── setUser(user) → AuthProvider stores the session
  └── navigate("/dashboard")
```

The CSRF check is entirely server-side. The client never verifies the state string — it just passes it back to the API which validates it against its own signed cookie.

---

## Filter data flow (Dashboard)

```
URL search params  (?exp=EN&setting=In-person&year=2023)
        │
        ▼
useDashboardFilters()       reads + writes the URL
        │
   ┌────┴────────────────────────────┐
   ▼                                 ▼
DashboardFilterSidebar         DashboardSidebar
  useFilterOptions(countryId)    └── SalaryList
    → filterOptions query               SALARY_LIST_QUERY
    → returns distinct values            (countryId + all active filters)
      that exist for this region         → paginated records
      → renders checkboxes               → client-side range slider
```

Filters live in the URL so they survive page reload and can be copied as a link.  
A single active value is sent directly to the API.  
Two or more active values for the same dimension → null sent to API, client filters the page after it arrives.

---

## Sub-folder READMEs

- [src/](./src/README.md) — entry point and App routing
- [src/features/](./src/features/README.md) — feature domains
- [src/pages/](./src/pages/README.md) — URL entry points
- [src/graphql/](./src/graphql/README.md) — queries and mutations
- [src/lib/](./src/lib/README.md) — Apollo Client setup
- [src/shared/](./src/shared/README.md) — hooks, map, and components
