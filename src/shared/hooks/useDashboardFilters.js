import { useSearchParams } from "react-router"

export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    experienceLevel: searchParams.get("exp") || null,
    workSetting: searchParams.get("setting") || null,
    workYear: searchParams.get("year")
      ? parseInt(searchParams.get("year"))
      : null,
    employmentType: searchParams.get("type") || null,
    companySize: searchParams.get("size") || null,
    companyId: searchParams.get("company") || null,
  }

  const activeCount = Object.values(filters).filter(Boolean).length

  function toggle(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (prev.get(key) === value) next.delete(key)
        else next.set(key, value)
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
