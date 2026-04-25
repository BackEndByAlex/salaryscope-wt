import { useState, useEffect, useMemo } from "react"
import { useQuery } from "@apollo/client/react"
import { SALARY_LIST_QUERY } from "../../../graphql/queries/sidebar.js"
import SalaryRow from "./SalaryRow.jsx"
import SalaryRangeSlider from "./SalaryRangeSlider.jsx"

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
          (b.salaryInUsd ?? b.salary ?? -1) - (a.salaryInUsd ?? a.salary ?? -1),
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
      {dataMax > 0 && (
        <SalaryRangeSlider
          dataMin={dataMin}
          dataMax={dataMax}
          lo={lo}
          hi={hi}
          onChange={setRange}
        />
      )}

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
