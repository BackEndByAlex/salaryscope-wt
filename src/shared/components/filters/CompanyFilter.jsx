import { useState } from "react"
import { useQuery } from "@apollo/client/react"
import { COMPANIES_FILTER_QUERY } from "../../../graphql/queries/companies.js"
import CollapsibleSection from "./CollapsibleSection.jsx"
import FilterRow from "./FilterRow.jsx"

export default function CompanyFilter({ selectedId, countryId, onToggle }) {
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
          <p className="text-xs py-2" style={{ color: "rgba(173,170,170,0.4)" }}>
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
            <p className="text-xs py-2" style={{ color: "rgba(173,170,170,0.4)" }}>
              No results.
            </p>
          )}
        </div>
      </div>
    </CollapsibleSection>
  )
}
