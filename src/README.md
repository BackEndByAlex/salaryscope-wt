# src/

Entry point and routing for the SalaryScope SPA.  
For the big-picture architecture, see [ROUTE_MAP.md](../ROUTE_MAP.md).

---

## main.jsx

The application root. It does two things and nothing else:

1. Creates the Apollo Client from `lib/Apollo.js` and wraps the whole app in `<ApolloProvider>` so every component below can run GraphQL queries
2. Mounts `<App />` into the `#root` DOM node

---

## App.jsx

Defines every route and the two access-control wrappers.

The component tree looks like this:

```
<BrowserRouter>
  <AuthProvider>          ← session state available to every route
    <Routes>
      /            → Home       (public)
      /login       → Login      (GuestRoute — redirects logged-in users away)
      /register    → Register   (GuestRoute)
      /profile     → Profile    (ProtectedRoute — redirects guests to /login)
      /dashboard   → Dashboard  (public)
      /analytics   → Analytics  (public)
      /auth/callback → OAuthCallback  (public, OAuth redirect target)
    </Routes>
  </AuthProvider>
</BrowserRouter>
```

**`ProtectedRoute`** — checks `useAuth()`. If there is no logged-in user, redirects to `/login` before rendering the child.

**`GuestRoute`** — checks `useAuth()`. If a user is already logged in, redirects to `/dashboard` so they can't land on login/register again.

---

## Sub-folders

```
src/
├── pages/       one file per URL — thin wrappers only
├── features/    business logic and page UI, one folder per domain
├── graphql/     GQL query and mutation strings
├── lib/         Apollo Client instance
└── shared/      components, hooks, and map utilities used across features
```
