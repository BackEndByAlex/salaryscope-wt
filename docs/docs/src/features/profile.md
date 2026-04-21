---
sidebar_position: 6
sidebar_label: Profile
---

# profile/

The authenticated user's profile page. Only reachable when logged in — `ProtectedRoute` handles the redirect.

![Salary Record CRUD](/img/diagrams/07-salary-record-crud.svg)

---

## ProfilePage.jsx

Fetches the current user with `ME_WITH_RECORDS_QUERY` using `fetchPolicy: "network-only"` to always get fresh data (not a cached version from the `AuthProvider` probe).

Derives `recordCount` from `data.me.salaryRecords.length` and passes it to `ProfileSidebar` so the "Records Contributed" stat reflects the real number.

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

Shows salary records the logged-in user has submitted to the API. Fetches with `ME_WITH_RECORDS_QUERY` and `fetchPolicy: "network-only"` so the list is always fresh from the server.

Each row shows: Job title, City and country, Salary (formatted with currency), Work year, Experience level, Work setting.

**Edit** — opens `EditRecordModal`. Country, city, and job title are read-only. All other fields can be changed.

**Delete** — shows an inline confirmation message in the row before calling `DELETE_SALARY_RECORD`. After deletion the record disappears and the list refetches.

Records from the public dataset (`createdBy: null`) are never returned here — this list only contains records the logged-in user created themselves.

---

## DeleteAccountCard.jsx

Lives in `src/shared/components/profile/`. Shows a "Danger Zone" section with a two-step confirm flow. On confirm: fires `DELETE_ACCOUNT_MUTATION`, clears the Apollo cache, sets user to null, and navigates to `/`. Salary records remain in the dataset but become anonymous (`createdBy` set to `null`).
