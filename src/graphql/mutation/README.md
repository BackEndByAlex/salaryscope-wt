# mutation/

Write operations. Authentication mutations live in `auth.js`. Salary record mutations live in `salaryRecords.js`.

---

## auth.js

**`LOGIN_MUTATION`**  
Email + password login. The API sets a session cookie on success and returns `{ user { id, email } }`. The cookie is HttpOnly and never accessible from JavaScript — the browser attaches it automatically on every subsequent request.

**`REGISTER_MUTATION`**  
Creates a new account. Returns `{ user { id, email } }` on success. Does not log the user in — they are redirected to `/login` afterwards.

**`LOGOUT_MUTATION`**  
Clears the session cookie server-side. Returns a boolean. After calling this, all subsequent requests will be unauthenticated.

**`DELETE_ACCOUNT_MUTATION`**  
Fires the `deleteAccount` mutation. Requires an active session cookie. On success: clears the Apollo cache, sets user to null, and navigates to `/`. No variables needed.

---

**`BEGIN_GOOGLE_LOGIN_MUTATION`** / **`BEGIN_GITHUB_LOGIN_MUTATION`**  
Start the OAuth flow. Takes a `BeginOAuthInput` with the PKCE `codeChallenge`. The API sets a signed HttpOnly state cookie (CSRF protection) and returns `{ authUrl }` — the URL to redirect the browser to.

These are called by `OAuthButtons` before the redirect happens.

**`GOOGLE_LOGIN_MUTATION`** / **`GITHUB_LOGIN_MUTATION`**  
Complete the OAuth flow after the callback. Takes `{ code, codeVerifier, state }`:

- `code` — from the `?code=` URL param after the provider redirects back
- `codeVerifier` — retrieved from `sessionStorage` (stored before the redirect)
- `state` — from the `?state=` URL param, passed back so the API can verify it against the cookie

The API verifies the state cookie with `crypto.timingSafeEqual`, exchanges the code for provider tokens, fetches the user profile, creates or links the account, sets the session cookie, and returns `{ user { id, email } }`.

---

---

## salaryRecords.js

**`CREATE_SALARY_RECORD`**  
Creates a new salary record tagged to the logged-in user. Sends `jobTitle` (free text — the API runs `findOrCreate`) and `cityName` + `employeeCountryId` (the API runs `findOrCreate` for the city too). Source is always `"user_submitted"`. Requires an active session cookie.

**`UPDATE_SALARY_RECORD`**  
Updates a salary record by ID. Only the owner can update — the API throws `ForbiddenError` otherwise. Source cannot be changed after creation, so it is not included in `UpdateSalaryRecordInput`.

**`DELETE_SALARY_RECORD`**  
Deletes a salary record by ID. Only the owner can delete. Returns a boolean. After calling this the client refetches `ME_WITH_RECORDS_QUERY` to remove the row from the profile list.

---

## Cookie flow summary

```
login / register / googleLogin / githubLogin
  └── API sets HttpOnly session cookie
        └── browser sends cookie on every request automatically
              └── API reads it, identifies user, populates context.user

logout
  └── API clears the cookie
        └── subsequent requests have no cookie → context.user = null
```

The JWT is never returned in the response body. Cookies only.
