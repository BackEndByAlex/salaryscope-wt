---
sidebar_position: 3
sidebar_label: Apollo Client
---

# lib/

Shared library instances — configured once and injected at the root.

---

## Apollo.js

Creates and exports the single Apollo Client instance used by the whole app.

```js
new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
})
```

**`uri`** — the GraphQL endpoint. Comes from `VITE_GRAPHQL_URL` in `.env` so it can be different in dev (`http://localhost:4000/graphql`) and production without touching code.

**`credentials: "include"`** — this is the critical line. It tells the browser to attach cookies to every request, including cross-origin ones. Without this, the session cookie set by the API would never be sent and every request would look unauthenticated.

**`InMemoryCache`** — Apollo's default cache. Responses are stored in memory and reused within the same session, so the same query with the same variables doesn't hit the network twice.

This instance is passed to `<ApolloProvider>` in `main.jsx`. Every `useQuery` and `useMutation` call in the component tree reaches it through that provider.
