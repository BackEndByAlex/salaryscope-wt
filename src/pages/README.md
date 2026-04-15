# pages/

Thin route entry points. Each file is one component that renders the matching feature — nothing more.

The reason they exist is to give React Router a named component per URL without putting any logic inside it. All layout, data fetching, and state live in the feature component below.

---

```
URL               Page             Renders
─────────────────────────────────────────────────────────
/                 Home.jsx         features/landing/LandingPage
/login            Login.jsx        features/auth/LoginPage
/register         Register.jsx     features/auth/RegisterPage
/profile          Profile.jsx      features/profile/ProfilePage
/dashboard        Dashboard.jsx    features/dashboard/DashboardPage
/analytics        Analytics.jsx    features/analytics/AnalyticsPage
```

`/auth/callback` has no page wrapper. The OAuth provider redirects there and `OAuthCallback` is mounted directly in `App.jsx`.

---

If you need to add behaviour to a route, add it to the feature component — not here.
