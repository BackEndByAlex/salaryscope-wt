import { useState, useEffect, useRef, useMemo } from "react"
import { useQuery } from "@apollo/client/react"
import { SALARY_LIST_QUERY } from "../../../graphql/queries/sidebar.js"
import SalaryRow from "./SalaryRow.jsx"

function formatSalary(usd) {
  if (usd == null) return "—"
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`
  if (usd >= 1000) return `$${Math.round(usd / 1000)}k`
  return `$${usd}`
}

// ── Dual-thumb range slider ───────────────────────────────────────────────────

function SalaryRangeSlider({ dataMin, dataMax, lo, hi, onChange }) {
  const trackRef = useRef(null)

  const span = dataMax - dataMin || 1
  const loPct = ((lo - dataMin) / span) * 100
  const hiPct = ((hi - dataMin) / span) * 100

  function valFromClientX(clientX) {
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    )
    const raw = dataMin + (pct / 100) * span
    return Math.round(raw / 1000) * 1000
  }

  function makeThumbHandler(thumb) {
    return (e) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      const capturedLo = lo
      const capturedHi = hi

      function onMove(ev) {
        const val = Math.min(
          dataMax,
          Math.max(dataMin, valFromClientX(ev.clientX)),
        )
        if (thumb === "lo") onChange([Math.min(val, capturedHi), capturedHi])
        else onChange([capturedLo, Math.max(val, capturedLo)])
      }

      e.currentTarget.addEventListener("pointermove", onMove)
      e.currentTarget.addEventListener(
        "pointerup",
        () => {
          e.currentTarget.removeEventListener("pointermove", onMove)
        },
        { once: true },
      )
    }
  }

  return (
    <div className="px-3 pb-3">
      <div className="flex justify-between mb-2.5">
        <span
          className="text-[0.6rem] tabular-nums font-bold"
          style={{ color: "#2563eb" }}
        >
          {formatSalary(lo)}
        </span>
        <span
          className="text-[0.6rem] uppercase tracking-widest"
          style={{ color: "rgba(173,170,170,0.4)" }}
        >
          salary range
        </span>
        <span
          className="text-[0.6rem] tabular-nums font-bold"
          style={{ color: "#2563eb" }}
        >
          {formatSalary(hi)}
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative mx-1.5"
        style={{
          height: "4px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        {/* Active fill */}
        <div
          className="absolute inset-y-0 rounded-full pointer-events-none"
          style={{
            left: `${loPct}%`,
            right: `${100 - hiPct}%`,
            background: "#2563eb",
          }}
        />

        {/* Low thumb */}
        <div
          onPointerDown={makeThumbHandler("lo")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
          style={{
            left: `${loPct}%`,
            width: 12,
            height: 12,
            background: "#ffffff",
            border: "2px solid #2563eb",
            cursor: "grab",
            zIndex: loPct > 90 ? 4 : 3,
            touchAction: "none",
          }}
        />

        {/* High thumb */}
        <div
          onPointerDown={makeThumbHandler("hi")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
          style={{
            left: `${hiPct}%`,
            width: 12,
            height: 12,
            background: "#ffffff",
            border: "2px solid #2563eb",
            cursor: "grab",
            zIndex: loPct > 90 ? 3 : 4,
            touchAction: "none",
          }}
        />
      </div>
    </div>
  )
}

// ── SalaryList ────────────────────────────────────────────────────────────────

// Multi-select arrays: pass single value to API; 0 or 2+ → null (client filters)
function singleOrNull(arr) {
  return arr?.length === 1 ? arr[0] : null
}

export default function SalaryList({ countryId, cityId, filters = {} }) {
  const expLevels = filters.experienceLevel ?? []
  const workSettings = filters.workSetting ?? []
  const empTypes = filters.employmentType ?? []

  const { data, loading, fetchMore } = useQuery(SALARY_LIST_QUERY, {
    variables: {
      countryId: countryId ?? null,
      cityId: cityId ?? null,
      offset: 0,
      experienceLevel: singleOrNull(expLevels),
      workSetting: singleOrNull(workSettings),
      workYear: filters.workYear ?? null,
      employmentType: singleOrNull(empTypes),
      companySize: filters.companySize ?? null,
      companyId: filters.companyId ?? null,
    },
  })

  const records = data?.salaryRecords?.records ?? []
  const hasNextPage = data?.salaryRecords?.hasNextPage

  // Sort highest → lowest — prefer USD value, fall back to raw salary
  const sorted = useMemo(
    () =>
      [...records].sort(
        (a, b) =>
          (b.salaryInUsd ?? b.salary ?? -1) -
          (a.salaryInUsd ?? a.salary ?? -1),
      ),
    [records],
  )

  // Derive min/max from loaded data — use salaryInUsd when present, else raw salary
  const dataMin = useMemo(() => {
    const vals = sorted
      .map((r) => r.salaryInUsd ?? r.salary)
      .filter((v) => v != null)
    return vals.length ? Math.min(...vals) : 0
  }, [sorted])

  const dataMax = useMemo(() => {
    const vals = sorted
      .map((r) => r.salaryInUsd ?? r.salary)
      .filter((v) => v != null)
    return vals.length ? Math.max(...vals) : 0
  }, [sorted])

  const [range, setRange] = useState(null) // null = full range

  // Reset range when location changes
  useEffect(() => {
    setRange(null)
  }, [countryId, cityId])

  const lo = range?.[0] ?? dataMin
  const hi = range?.[1] ?? dataMax

  const visible = useMemo(
    () =>
      sorted.filter((r) => {
        // Salary range — prefer USD value, fall back to raw salary
        const s = r.salaryInUsd ?? r.salary
        if (s == null) return true
        if (s < lo || s > hi) return false

        // Multi-select filters (only applied client-side when 2+ values selected)
        if (expLevels.length > 1 && !expLevels.includes(r.experienceLevel))
          return false
        if (workSettings.length > 1 && !workSettings.includes(r.workSetting))
          return false
        if (empTypes.length > 1 && !empTypes.includes(r.employmentType))
          return false

        return true
      }),
    [sorted, lo, hi, dataMin, expLevels, workSettings, empTypes],
  )

  function loadMore() {
    fetchMore({
      variables: { offset: records.length },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        return {
          salaryRecords: {
            ...fetchMoreResult.salaryRecords,
            records: [
              ...(prev.salaryRecords?.records ?? []),
              ...fetchMoreResult.salaryRecords.records,
            ],
          },
        }
      },
    })
  }

  if (loading && records.length === 0) {
    return (
      <div className="py-6 flex justify-center">
        <span className="material-symbols-outlined animate-spin text-on-surface-variant/40 text-2xl">
          progress_activity
        </span>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <p className="py-2 text-xs text-on-surface-variant/50">
        No records found.
      </p>
    )
  }

  return (
    <div>
      {/* Salary range slider */}
      {dataMax > 0 && (
        <SalaryRangeSlider
          dataMin={dataMin}
          dataMax={dataMax}
          lo={lo}
          hi={hi}
          onChange={setRange}
        />
      )}

      {/* Records */}
      {visible.length === 0 ? (
        <p
          className="py-2 px-3 text-xs"
          style={{ color: "rgba(173,170,170,0.5)" }}
        >
          No records in this range.
        </p>
      ) : (
        visible.map((record) => <SalaryRow key={record.id} record={record} />)
      )}

      {hasNextPage && (
        <div className="pt-3">
          <button
            onClick={loadMore}
            disabled={loading}
            className="w-full py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface
                       border border-outline-variant/20 hover:border-outline-variant/50
                       transition-colors disabled:opacity-40"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  )
}
