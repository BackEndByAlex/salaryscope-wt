export function normalizeBaseUrl(value, fallback = "") {
  const base = (value ?? fallback).trim()
  return base.replace(/\/+$/, "")
}

export function getApiBaseUrl() {
  return normalizeBaseUrl(import.meta.env.VITE_API_URL, "http://localhost:4000")
}
