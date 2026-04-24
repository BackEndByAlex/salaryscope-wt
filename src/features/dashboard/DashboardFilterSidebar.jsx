import { useState, useId, useRef, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import { COMPANIES_FILTER_QUERY } from "../../graphql/queries/companies.js"
import { useResizable } from "../../shared/hooks/useResizable.js"
import { useFilterOptions } from "../../shared/hooks/useFilterOptions.js"
import { useSearch } from "../../shared/hooks/useSearch.js"

// Display label maps — handle both raw CSV strings and short codes from different datasets
const EXP_LABELS = {
  EN: "Entry",
  "Entry-level": "Entry",
  MI: "Mid",
  "Mid-level": "Mid",
  SE: "Senior",
  Senior: "Senior",
  EX: "Executive",
  Executive: "Executive",
}

const SETTING_LABELS = {
  Remote: "Remote",
  Hybrid: "Hybrid",
  "In-person": "In-person",
}

const TYPE_LABELS = {
  FT: "Full-time",
  "Full-time": "Full-time",
  PT: "Part-time",
  "Part-time": "Part-time",
  CT: "Contract",
  Contract: "Contract",
  FL: "Freelance",
  Freelance: "Freelance",
}

const SIZE_LABELS = {
  S: "S",
  M: "M",
  L: "L",
}

// Deduplicate values that map to the same display label (DB has EN + Entry-level, FT + Full-time, etc.)
function dedupeByLabel(values, labelMap) {
  const seen = new Set()
  return values.filter((v) => {
    const label = labelMap[v] ?? v
    if (seen.has(label)) return false
    seen.add(label)
    return true
  })
}

// ── Skeleton rows — shown while filter options are loading ────────────────────

function OptionsSkeleton({ rows = 3 }) {
  return (
    <div className="px-3 py-1 space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-sm animate-pulse"
          style={{
            width: `${55 + (i % 3) * 15}%`,
            background: "rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  )
}

// ── Checkbox row ──────────────────────────────────────────────────────────────

function FilterRow({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors group"
      style={{
        background: active ? "rgba(37,99,235,0.12)" : "transparent",
        borderLeft: active ? "2px solid #2563eb" : "2px solid transparent",
      }}
    >
      <span
        className="shrink-0 w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors"
        style={{
          background: active ? "#2563eb" : "transparent",
          border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {active && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className="text-xs transition-colors"
        style={{
          color: active ? "#ffffff" : "rgba(173,170,170,0.8)",
          fontWeight: active ? 500 : 400,
        }}
      >
        {label}
      </span>
    </button>
  )
}

// ── Compact chip ──────────────────────────────────────────────────────────────

function CompactChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs rounded-sm transition-colors"
      style={{
        background: active ? "#2563eb" : "transparent",
        border: active
          ? "1px solid transparent"
          : "1px solid rgba(255,255,255,0.1)",
        color: active ? "#ffffff" : "rgba(173,170,170,0.8)",
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </button>
  )
}

// ── Collapsible section ───────────────────────────────────────────────────────

function CollapsibleSection({ label, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const regionId = useId()

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="w-full flex items-center justify-between px-3 py-3 group"
        style={{ borderLeft: "3px solid #00bcd4" }}
      >
        <span
          className="text-[0.6rem] uppercase tracking-widest font-bold"
          style={{ color: "rgba(173,170,170,0.6)" }}
        >
          {label}
        </span>
        <span
          className="material-symbols-outlined text-sm transition-transform duration-200"
          style={{
            color: "rgba(173,170,170,0.4)",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          expand_more
        </span>
      </button>

      <div
        id={regionId}
        style={{
          maxHeight: open ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 200ms ease",
        }}
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  )
}

// ── Company search ────────────────────────────────────────────────────────────

function CompanyFilter({ selectedId, countryId, onToggle }) {
  const [search, setSearch] = useState("")
  const { data, loading } = useQuery(COMPANIES_FILTER_QUERY, {
    variables: { countryId: countryId ?? null },
  })

  const companies = data?.companies?.companies ?? []
  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  )
  const placeholder = countryId ? "Search company…" : "Select a country first"

  return (
    <CollapsibleSection label="Company">
      <div className="px-3 pb-1">
        <div className="relative mb-2">
          <span
            className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "rgba(173,170,170,0.4)" }}
          >
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            disabled={!countryId}
            className="w-full pl-7 pr-3 py-1.5 text-xs focus:outline-none transition-colors"
            style={{
              background: "#111318",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              color: "#ffffff",
              opacity: countryId ? 1 : 0.4,
              cursor: countryId ? "text" : "not-allowed",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(37,99,235,0.5)"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.08)"
            }}
          />
        </div>
        {loading && (
          <p
            className="text-xs py-2"
            style={{ color: "rgba(173,170,170,0.4)" }}
          >
            Loading…
          </p>
        )}
        <div className="space-y-0.5">
          {filtered.map((c) => (
            <FilterRow
              key={c.id}
              label={c.name}
              active={selectedId === c.id}
              onClick={() => onToggle("company", c.id)}
            />
          ))}
          {!loading && countryId && filtered.length === 0 && (
            <p
              className="text-xs py-2"
              style={{ color: "rgba(173,170,170,0.4)" }}
            >
              No results.
            </p>
          )}
        </div>
      </div>
    </CollapsibleSection>
  )
}

// ── Main sidebar ──────────────────────────────────────────────────────────────

export default function DashboardFilterSidebar({
  filters,
  activeCount,
  onToggle,
  onClear,
  selectedCountryId,
  selectedCityId,
  onSearchSelect,
}) {
  const { width, handlePointerDown } = useResizable({
    defaultWidth: 224,
    min: 140,
    max: 420,
    direction: "right",
  })
  const { options, loading } = useFilterOptions({
    countryId: selectedCountryId,
    cityId: selectedCityId,
  })
  const {
    query,
    setQuery,
    results,
    loading: searchLoading,
    clear: clearSearch,
  } = useSearch()
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)

  // Close dropdown when clicking outside
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
    <aside
      className="shrink-0 flex flex-col filter-scrollbar relative"
      style={{
        width,
        background: "#1a1d23",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Resize handle */}
      <div
        onPointerDown={handlePointerDown}
        className="absolute top-0 right-0 bottom-0 w-1.5 z-10 group"
        style={{ cursor: "col-resize" }}
      >
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ background: "rgba(37,99,235,0.6)" }}
        />
      </div>

      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-3 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-base"
            style={{ color: "rgba(173,170,170,0.7)" }}
          >
            tune
          </span>
          <span className="text-sm font-bold text-white">Filters</span>
          {activeCount > 0 && (
            <span
              className="text-[0.6rem] font-black px-1.5 py-0.5 rounded-sm"
              style={{ background: "#2563eb", color: "#ffffff" }}
            >
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-[0.6875rem] transition-colors"
            style={{ color: "rgba(173,170,170,0.6)" }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ffffff"
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "rgba(173,170,170,0.6)"
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Search ── */}
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

        {/* ── Results dropdown ── */}
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

        {searchOpen &&
          query.length >= 2 &&
          !searchLoading &&
          results.length === 0 && (
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

      {/* ── Dynamic filter sections ── */}
      <CollapsibleSection label="Experience Level">
        {loading ? (
          <OptionsSkeleton rows={4} />
        ) : (
          dedupeByLabel(options.experienceLevels, EXP_LABELS).map((value) => (
            <FilterRow
              key={value}
              label={EXP_LABELS[value] ?? value}
              active={filters.experienceLevel.includes(value)}
              onClick={() => onToggle("exp", value)}
            />
          ))
        )}
      </CollapsibleSection>

      <CollapsibleSection label="Work Setting">
        {loading ? (
          <OptionsSkeleton rows={3} />
        ) : (
          dedupeByLabel(options.workSettings, SETTING_LABELS).map((value) => (
            <FilterRow
              key={value}
              label={SETTING_LABELS[value] ?? value}
              active={filters.workSetting.includes(value)}
              onClick={() => onToggle("setting", value)}
            />
          ))
        )}
      </CollapsibleSection>

      <CollapsibleSection label="Employment Type">
        {loading ? (
          <OptionsSkeleton rows={4} />
        ) : (
          dedupeByLabel(options.employmentTypes, TYPE_LABELS).map((value) => (
            <FilterRow
              key={value}
              label={TYPE_LABELS[value] ?? value}
              active={filters.employmentType.includes(value)}
              onClick={() => onToggle("type", value)}
            />
          ))
        )}
      </CollapsibleSection>

      <CollapsibleSection label="Company Size">
        <div className="px-3 pt-1 pb-2 flex flex-wrap gap-1.5">
          {loading ? (
            <OptionsSkeleton rows={1} />
          ) : (
            options.companySizes
              .filter((v) => v === "S" || v === "M" || v === "L")
              .map((value) => (
                <CompactChip
                  key={value}
                  label={SIZE_LABELS[value] ?? value}
                  active={filters.companySize === value}
                  onClick={() => onToggle("size", value)}
                />
              ))
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection label="Year">
        <div className="px-3 pt-1 pb-2 flex flex-wrap gap-1.5">
          {loading ? (
            <OptionsSkeleton rows={1} />
          ) : (
            options.workYears.map((year) => (
              <CompactChip
                key={year}
                label={String(year)}
                active={filters.workYear === year}
                onClick={() => onToggle("year", String(year))}
              />
            ))
          )}
        </div>
      </CollapsibleSection>

      <CompanyFilter
        selectedId={filters.companyId}
        countryId={selectedCountryId}
        onToggle={onToggle}
      />
    </aside>
  )
}
