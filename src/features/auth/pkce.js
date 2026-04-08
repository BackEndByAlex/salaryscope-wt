// PKCE (Proof Key for Code Exchange) utilities for GitHub OAuth flow.
// The code_verifier is a random secret the client creates.
// The code_challenge is a SHA-256 hash of it sent to GitHub.
// When exchanging the code, the verifier proves the client is the same one that started the flow.

function base64urlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

export function generateCodeVerifier() {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return base64urlEncode(bytes)
}

export async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return base64urlEncode(hash)
}

export function generateState() {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return base64urlEncode(bytes)
}

export async function redirectToGitHub() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = `${generateState()}.github`

  sessionStorage.setItem("oauth_code_verifier", codeVerifier)
  sessionStorage.setItem("oauth_state", state)

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
    scope: "user:email",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  })

  window.location.href = `https://github.com/login/oauth/authorize?${params}`
}

export async function redirectToGoogle() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = `${generateState()}.google`

  sessionStorage.setItem("oauth_code_verifier", codeVerifier)
  sessionStorage.setItem("oauth_state", state)

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    access_type: "online",
  })

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}
