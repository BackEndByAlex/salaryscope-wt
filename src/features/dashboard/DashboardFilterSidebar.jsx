import { useState, useRef, useEffect } from "react"
import { useResizable } from "../../shared/hooks/useResizable.js"
import { useFilterOptions } from "../../shared/hooks/useFilterOptions.js"
import { useSearch } from "../../shared/hooks/useSearch.js"
import OptionsSkeleton from "../../shared/components/filters/OptionsSkeleton.jsx"
import FilterRow from "../../shared/components/filters/FilterRow.jsx"
import CompactChip from "../../shared/components/filters/CompactChip.jsx"
import CollapsibleSection from "../../shared/components/filters/CollapsibleSection.jsx"
import CompanyFilter from "../../shared/components/filters/CompanyFilter.jsx"

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

export default function DashboardFilterSidebar({
  filters,
  activeCount,
  onToggle,
  onClear,
  selectedCountryId,
  selectedCityId,
  onSearchSelect,
  isOpen,
  onClose,
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
      className={[
        "flex flex-col filter-scrollbar",
        // Mobile: fixed drawer that slides in/out
        "fixed inset-y-0 left-0 z-40 transition-transform duration-300 md:transition-none",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: static inline, always visible
        "md:static md:translate-x-0 md:z-auto md:shrink-0",
      ].join(" ")}
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
        <div className="flex items-center gap-2">
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
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded transition-colors"
            style={{ color: "rgba(173,170,170,0.6)" }}
            aria-label="Close filters"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
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
