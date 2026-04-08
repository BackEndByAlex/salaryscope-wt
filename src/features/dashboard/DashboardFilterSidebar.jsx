import { useState, useId } from "react"
import { useQuery } from "@apollo/client/react"
import { COMPANIES_FILTER_QUERY } from "../../graphql/queries/companies.js"
import { useResizable } from "../../shared/hooks/useResizable.js"

// Values match what is actually stored in the DB (raw CSV strings)
const EXPERIENCE_OPTIONS = [
  { value: "Entry-level", label: "Entry" },
  { value: "Mid-level",   label: "Mid" },
  { value: "Senior",      label: "Senior" },
  { value: "Executive",   label: "Executive" },
]

const WORK_SETTING_OPTIONS = [
  { value: "Remote",    label: "Remote" },
  { value: "Hybrid",    label: "Hybrid" },
  { value: "In-person", label: "In-person" },
]

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract",  label: "Contract" },
  { value: "Freelance", label: "Freelance" },
]

const COMPANY_SIZE_OPTIONS = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
]

const YEARS = [2020, 2021, 2022, 2023, 2024]

// ── Checkbox row — used for text-heavy options ────────────────────────────────

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
      {/* Custom checkbox */}
      <span
        className="shrink-0 w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors"
        style={{
          background: active ? "#2563eb" : "transparent",
          border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {active && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        className="text-xs transition-colors"
        style={{ color: active ? "#ffffff" : "rgba(173,170,170,0.8)", fontWeight: active ? 500 : 400 }}
      >
        {label}
      </span>
    </button>
  )
}

// ── Compact chip — used for short-label options (year, company size) ──────────

function CompactChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs rounded-sm transition-colors"
      style={{
        background: active ? "#2563eb" : "transparent",
        border: active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
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
      {/* Header */}
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

      {/* Body — max-height transition for smooth open/close */}
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
            onFocus={(e) => { e.target.style.borderColor = "rgba(37,99,235,0.5)" }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)" }}
          />
        </div>
        {loading && (
          <p className="text-xs py-2" style={{ color: "rgba(173,170,170,0.4)" }}>Loading…</p>
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
            <p className="text-xs py-2" style={{ color: "rgba(173,170,170,0.4)" }}>No results.</p>
          )}
        </div>
      </div>
    </CollapsibleSection>
  )
}

// ── Main sidebar ──────────────────────────────────────────────────────────────

export default function DashboardFilterSidebar({ filters, activeCount, onToggle, onClear, selectedCountryId }) {
  const { width, handlePointerDown } = useResizable({ defaultWidth: 224, min: 140, max: 420, direction: "right" })

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
      {/* ── Sticky header ── */}
      <div
        className="flex items-center justify-between px-3 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base" style={{ color: "rgba(173,170,170,0.7)" }}>
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
            onMouseEnter={(e) => { e.target.style.color = "#ffffff" }}
            onMouseLeave={(e) => { e.target.style.color = "rgba(173,170,170,0.6)" }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Global search placeholder ── */}
      <div
        className="px-3 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="relative">
          <span
            className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "rgba(173,170,170,0.4)" }}
          >
            search
          </span>
          <input
            type="text"
            disabled
            placeholder="Coming soon…"
            className="w-full pl-7 pr-3 py-1.5 text-xs cursor-not-allowed"
            style={{
              background: "#111318",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              color: "rgba(173,170,170,0.3)",
              opacity: 0.5,
            }}
          />
        </div>
      </div>

      {/* ── Filter sections ── */}
      <CollapsibleSection label="Experience Level">
        {EXPERIENCE_OPTIONS.map(({ value, label }) => (
          <FilterRow
            key={value}
            label={label}
            active={filters.experienceLevel === value}
            onClick={() => onToggle("exp", value)}
          />
        ))}
      </CollapsibleSection>

      <CollapsibleSection label="Work Setting">
        {WORK_SETTING_OPTIONS.map(({ value, label }) => (
          <FilterRow
            key={value}
            label={label}
            active={filters.workSetting === value}
            onClick={() => onToggle("setting", value)}
          />
        ))}
      </CollapsibleSection>

      <CollapsibleSection label="Employment Type">
        {EMPLOYMENT_TYPE_OPTIONS.map(({ value, label }) => (
          <FilterRow
            key={value}
            label={label}
            active={filters.employmentType === value}
            onClick={() => onToggle("type", value)}
          />
        ))}
      </CollapsibleSection>

      <CollapsibleSection label="Company Size">
        <div className="px-3 pt-1 pb-2 flex flex-wrap gap-1.5">
          {COMPANY_SIZE_OPTIONS.map(({ value, label }) => (
            <CompactChip
              key={value}
              label={label}
              active={filters.companySize === value}
              onClick={() => onToggle("size", value)}
            />
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection label="Year">
        <div className="px-3 pt-1 pb-2 flex flex-wrap gap-1.5">
          {YEARS.map((year) => (
            <CompactChip
              key={year}
              label={String(year)}
              active={filters.workYear === year}
              onClick={() => onToggle("year", String(year))}
            />
          ))}
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
