# graphql/

All GraphQL documents used by the app — queries and mutations. No logic, no components, just GQL strings.

---

## How Apollo uses these

Each file exports one or more `gql` tagged template strings. Apollo compiles them into request documents at build time. A component imports the document it needs and passes it to `useQuery()` or `useMutation()`:

```js
import { SALARY_LIST_QUERY } from "../../graphql/queries/sidebar.js"

const { data } = useQuery(SALARY_LIST_QUERY, { variables: { ... } })
```

The Apollo Client instance that actually sends requests is configured in `lib/Apollo.js`.

---

## Structure

```
graphql/
├── queries/     read operations — fetch data from the API
└── mutation/    write operations — auth (login, register, OAuth)
```

→ [queries/README.md](./queries/README.md)  
→ [mutation/README.md](./mutation/README.md)
