import { useSearchParams } from "react-router"

export const FILTER_KEYS = {
  exp: "exp",
  setting: "setting",
  type: "type",
  year: "year",
  size: "size",
  company: "company",
}

// These keys store comma-separated multi-select values
const MULTI_KEYS = new Set([FILTER_KEYS.exp, FILTER_KEYS.setting, FILTER_KEYS.type])

function getArray(searchParams, key) {
  return searchParams.get(key)?.split(",").filter(Boolean) ?? []
}

export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    experienceLevel: getArray(searchParams, FILTER_KEYS.exp),
    workSetting: getArray(searchParams, FILTER_KEYS.setting),
    employmentType: getArray(searchParams, FILTER_KEYS.type),
    workYear: searchParams.get(FILTER_KEYS.year)
      ? parseInt(searchParams.get(FILTER_KEYS.year))
      : null,
    companySize: searchParams.get(FILTER_KEYS.size) || null,
    companyId: searchParams.get(FILTER_KEYS.company) || null,
  }

  const activeCount =
    filters.experienceLevel.length +
    filters.workSetting.length +
    filters.employmentType.length +
    (filters.workYear ? 1 : 0) +
    (filters.companySize ? 1 : 0) +
    (filters.companyId ? 1 : 0)

  function toggle(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (MULTI_KEYS.has(key)) {
          const current = prev.get(key)?.split(",").filter(Boolean) ?? []
          const idx = current.indexOf(value)
          if (idx >= 0) current.splice(idx, 1)
          else current.push(value)
          if (current.length === 0) next.delete(key)
          else next.set(key, current.join(","))
        } else {
          if (prev.get(key) === value) next.delete(key)
          else next.set(key, value)
        }
        return next
      },
      { replace: true },
    )
  }

  function clear() {
    setSearchParams({}, { replace: true })
  }

  function clearFilter(key) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  return { filters, activeCount, toggle, clear, clearFilter }
}
