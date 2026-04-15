# profile/

The authenticated user's profile page. Only reachable when logged in — `ProtectedRoute` handles the redirect.

---

## ProfilePage.jsx

Fetches the current user with `ME_QUERY` using `fetchPolicy: "network-only"` to always get fresh data (not a cached version from the `AuthProvider` probe). Passes the result down to three display components.

Layout:

```
┌──────────────────┬───────────────────────────────────┐
│  ProfileSidebar  │  IdentityNodeCard                 │
│                  │  (email, account ID, created date)│
│  avatar          ├───────────────────────────────────┤
│  display name    │  ConnectedProtocolsCard           │
│  email           │  (Google / GitHub linked status)  │
│                  ├───────────────────────────────────┤
│                  │  UserRecords                      │
│                  │  (salary records submitted)       │
└──────────────────┴───────────────────────────────────┘
```

---

## UserRecords.jsx

Shows salary records the logged-in user has submitted to the API. Currently renders an empty state — the list is wired up but the `records` array is a placeholder. When populated from the API, each entry will show job title, submission date, and salary.
