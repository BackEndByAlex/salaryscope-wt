---
sidebar_position: 2
sidebar_label: Authentication
---

# auth/

Everything that handles who the user is and whether they are allowed to be somewhere.

![Auth Flow](/img/diagrams/03-auth-flow.svg)

---

## AuthProvider.jsx

The session store for the whole app. It wraps the entire component tree (mounted in `App.jsx`) and holds the logged-in user in React context.

On mount it fires a `me` query to check for an existing session cookie:

- If the cookie is valid → sets the user and the app renders in authenticated state
- If no cookie / invalid → leaves user as null, shows guest state

A 401 response from `me` is normal and expected. It means no session exists — not an error.

---

## useAuth.js

Reads from `AuthProvider`. Returns `{ user, setUser, loading }`.

Import this anywhere you need to know who is logged in. Never read the context directly.

---

## LoginPage.jsx

The login form. Handles two cases:

1. **Email + password** — submits `LOGIN_MUTATION`. On success, `setUser()` is called and the user is sent to `/dashboard`.
2. **OAuth entry** — renders `OAuthButtons` which starts the OAuth flow (see below).

If the `?error=` query param is present in the URL (written there by `OAuthCallback` on failure), a human-readable error message is shown above the form.

---

## RegisterPage.jsx

The register form. Submits `REGISTER_MUTATION` with email and password. On success, redirects to `/login` — the user has to log in explicitly after registering.

---

## OAuthButtons.jsx

The "Sign in with Google" and "Sign in with GitHub" buttons. When clicked:

```
1. Generate PKCE pair — codeVerifier + codeChallenge  (pkce.js)
2. Call beginGoogleLogin / beginGithubLogin mutation
     └── API sets a signed HttpOnly state cookie
         returns authUrl
3. Store codeVerifier and provider in sessionStorage
4. Redirect browser to authUrl
```

The PKCE `codeVerifier` is stored in `sessionStorage` because it needs to survive the redirect away from the page and be readable when the browser comes back to `/auth/callback`.

---

## pkce.js

Generates the PKCE (Proof Key for Code Exchange) pair used in the OAuth flow:

- `codeVerifier` — a cryptographically random string, stored in sessionStorage
- `codeChallenge` — SHA-256 hash of the verifier, sent to the API so it can verify the exchange

PKCE prevents an attacker from intercepting the authorization code and using it themselves — the code is only useful if you also have the verifier.

---

## OAuthCallback.jsx

Handles the redirect back from Google or GitHub. The browser lands on `/auth/callback?code=...&state=...`.

```
1. Read code + state from URL search params
2. Read codeVerifier + provider from sessionStorage
3. Clear sessionStorage  (one-time use)
4. If code or codeVerifier is missing → redirect to /login?error=...
5. Call googleLogin / githubLogin mutation
     └── API verifies state cookie with timingSafeEqual
         exchanges code for tokens
         fetches user profile from provider
         sets session cookie
         returns user
6. setUser(user) → session stored in AuthProvider
7. navigate("/dashboard")
```

On any error, the user is redirected to `/login?error=<message>` and `LoginPage` shows it.

Strict Mode in dev fires effects twice — a `called` ref guards against double execution.

---

## ProtectedRoute.jsx

A wrapper component. Checks `useAuth()`. If `user` is null, redirects to `/login`. Otherwise renders its children. Wrap any route that requires authentication.

---

## GuestRoute.jsx

The opposite of `ProtectedRoute`. If a user is already logged in, redirects to `/dashboard`. Otherwise renders the child (login/register pages). Prevents a logged-in user from seeing the login form.

---

## Auth flow summary

```
Incoming request
  └── AuthProvider (on mount)
        └── me query
              ├── 200 + user  →  logged in, render protected routes
              └── 401         →  guest state, ProtectedRoute redirects to /login

Login / Register
  └── mutation succeeds
        └── setUser(user) → AuthProvider stores session
              └── navigate to /dashboard

OAuth
  └── beginGoogleLogin  →  API sets state cookie, returns authUrl
  └── redirect to Google
  └── Google redirects to /auth/callback
  └── googleLogin mutation  →  API verifies state, sets session cookie
  └── setUser(user)  →  navigate to /dashboard
```
