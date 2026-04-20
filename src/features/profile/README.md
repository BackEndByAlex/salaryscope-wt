# profile/

The authenticated user's profile page. Only reachable when logged in — `ProtectedRoute` handles the redirect.

---

## ProfilePage.jsx

Fetches the current user with `ME_WITH_RECORDS_QUERY` using `fetchPolicy: "network-only"` to always get fresh data (not a cached version from the `AuthProvider` probe). Using the records-included query here means the sidebar count is always in sync with the record list — no second request needed.

Derives `recordCount` from `data.me.salaryRecords.length` and passes it to `ProfileSidebar` so the "Records Contributed" stat reflects the real number. Passes the result down to the display components.

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

The `ProfileSidebar` receives a `recordCount` prop and shows it as the "Records Contributed" stat.

---

## UserRecords.jsx

Shows salary records the logged-in user has submitted to the API. Fetches with `ME_WITH_RECORDS_QUERY` and `fetchPolicy: "network-only"` so the list is always fresh from the server, never served from cache.

Each row shows:
- Job title
- City and country
- Salary (formatted with currency)
- Work year
- Experience level
- Work setting

**Edit** — opens `EditRecordModal`. Country, city, and job title are read-only there. All other fields can be changed.

**Delete** — shows an inline confirmation message in the row before calling `DELETE_SALARY_RECORD`. After deletion the record disappears and the list refetches.

Records from the public dataset (`createdBy: null`) are never returned here — this list only contains records the logged-in user created themselves.

---

## DeleteAccountCard.jsx

Lives in `src/shared/components/profile/`. Shows a "Danger Zone" section with a two-step confirm flow — "Delete Account" button reveals a panel with "Yes, delete my account" / "Cancel". On confirm: fires `DELETE_ACCOUNT_MUTATION`, clears the Apollo cache, sets user to null, and navigates to `/`. Salary records remain in the dataset but become anonymous (`createdBy` set to `null`).
