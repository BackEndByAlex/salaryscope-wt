# shared/

Reusable building blocks used by two or more features.

The rule: a file only moves here when more than one feature needs it. Single-use components and hooks stay inside their feature folder. This keeps `shared/` intentional and small.

---

```
shared/
├── hooks/        custom React hooks — data fetching logic and UI helpers
├── map/          MapLibre GL setup — constants, layers, utility functions
└── components/   reusable UI components, organized by type
```

→ [Hooks](./hooks/README.md)  
→ [Map](./map/README.md)  
→ [Components](./components/README.md)
