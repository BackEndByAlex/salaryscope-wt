import { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client/react"
import { SEARCH_RECORDS_QUERY } from "../../graphql/queries/search.js"

const DEBOUNCE_MS = 300

export function useSearch() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const [search, { data, loading }] = useLazyQuery(SEARCH_RECORDS_QUERY, {
    fetchPolicy: "network-only",
  })

  // Debounce the raw input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query])

  // Fire the query when the debounced value settles
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      search({ variables: { query: debouncedQuery.trim(), limit: 8 } })
    }
  }, [debouncedQuery, search])

  const results = data?.searchRecords?.records ?? []
  const totalCount = data?.searchRecords?.totalCount ?? 0

  function clear() {
    setQuery("")
    setDebouncedQuery("")
  }

  return { query, setQuery, results, totalCount, loading, clear }
}
