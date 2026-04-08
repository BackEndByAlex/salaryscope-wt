import { useQuery } from "@apollo/client/react"
import { SALARY_LIST_QUERY } from "../../../graphql/queries/sidebar.js"
import SalaryRow from "./SalaryRow.jsx"

export default function SalaryList({ countryId, cityId, filters = {} }) {
  const { data, loading, fetchMore } = useQuery(SALARY_LIST_QUERY, {
    variables: {
      countryId:       countryId ?? null,
      cityId:          cityId ?? null,
      offset:          0,
      experienceLevel: filters.experienceLevel ?? null,
      workSetting:     filters.workSetting ?? null,
      workYear:        filters.workYear ?? null,
      employmentType:  filters.employmentType ?? null,
      companySize:     filters.companySize ?? null,
      companyId:       filters.companyId ?? null,
    },
  })

  const records = data?.salaryRecords?.records ?? []
  const hasNextPage = data?.salaryRecords?.hasNextPage

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
      <p className="py-2 text-xs text-on-surface-variant/50">No records found.</p>
    )
  }

  return (
    <div>
      {records.map((record) => (
        <SalaryRow key={record.id} record={record} />
      ))}

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
