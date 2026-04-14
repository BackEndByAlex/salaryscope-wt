// PKCE (Proof Key for Code Exchange) utilities.
// The code_verifier is a random secret the client creates.
// The code_challenge is a SHA-256 hash of it sent to the provider.
// When exchanging the code, the verifier proves the client is the same one that started the flow.
// The OAuth state and provider redirect URL are now owned by the backend (beginGoogleLogin /
// beginGithubLogin mutations) — this file only handles the PKCE key pair.

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
