import { useState, useRef, useEffect } from "react"
import { useSearch } from "../../hooks/useSearch.js"

export default function SidebarSearch({ onSearchSelect }) {
  const {
    query,
    setQuery,
    results,
    loading: searchLoading,
    clear: clearSearch,
  } = useSearch()

  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div
      ref={searchRef}
      className="px-3 py-3 relative"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="relative">
        <span
          className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm"
          style={{
            color: searchLoading
              ? "rgba(37,99,235,0.8)"
              : "rgba(173,170,170,0.5)",
          }}
        >
          {searchLoading ? "progress_activity" : "search"}
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSearchOpen(true)
          }}
          onFocus={() => query.length >= 2 && setSearchOpen(true)}
          placeholder="Search job titles, cities…"
          className="w-full pl-7 pr-7 py-1.5 text-xs outline-none"
          style={{
            background: "#111318",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            color: "rgba(220,220,220,0.9)",
          }}
        />
        {query && (
          <button
            onClick={() => {
              clearSearch()
              setSearchOpen(false)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(173,170,170,0.5)" }}
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {searchOpen && results.length > 0 && (
        <div
          className="absolute left-3 right-3 z-50 overflow-hidden mt-1"
          style={{
            background: "#1e2128",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {results.map((r) => (
            <button
              key={r.id}
              className="w-full text-left px-3 py-2 transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(37,99,235,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              onClick={() => {
                onSearchSelect?.({
                  countryId: r.countryId,
                  countryName: r.country,
                  cityId: r.cityId,
                  cityName: r.city,
                })
                setSearchOpen(false)
                clearSearch()
              }}
            >
              <div className="text-xs font-medium text-white truncate">
                {r.jobTitle}
              </div>
              <div
                className="text-[0.65rem] mt-0.5 truncate"
                style={{ color: "rgba(173,170,170,0.6)" }}
              >
                {[r.city, r.country].filter(Boolean).join(", ")}
                {r.salaryInUsd && (
                  <span
                    className="ml-2"
                    style={{ color: "rgba(37,99,235,0.9)" }}
                  >
                    ${Math.round(r.salaryInUsd).toLocaleString()}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {searchOpen && query.length >= 2 && !searchLoading && results.length === 0 && (
        <div
          className="absolute left-3 right-3 z-50 px-3 py-3 text-xs mt-1"
          style={{
            background: "#1e2128",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            color: "rgba(173,170,170,0.5)",
          }}
        >
          No results for "{query}"
        </div>
      )}
    </div>
  )
}
