# components/auth/

Layout and form primitives for the login and register pages.

---

## AuthLayout.jsx

Full-page wrapper for auth pages. Sets the dark background, centers the content column, and handles the two-column split — decorative visual on one side, form on the other. `LoginPage` and `RegisterPage` both render inside this.

---

## AuthHeader.jsx

The logo and page title at the top of an auth form. Takes `title` and an optional `subtitle` prop. Renders the same header structure on every auth page without duplicating markup.

---

## AuthFormField.jsx

A labeled text input. Takes `label`, `type`, `value`, `onChange`, and an optional `error` string. When `error` is provided it renders a red message below the field. Used for every input in the auth forms — email, password, etc.

---

## OAuthButtons.jsx

"Sign in with Google" and "Sign in with GitHub" buttons. See [features/auth/README.md](../../../features/auth/README.md) for the full flow.

In short — on click:
1. Generates a PKCE pair (`pkce.js`)
2. Calls `beginGoogleLogin` / `beginGithubLogin` mutation
3. Stores `codeVerifier` + `provider` in `sessionStorage`
4. Redirects to the `authUrl` returned by the API
