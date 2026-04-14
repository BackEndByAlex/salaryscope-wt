import { useQuery } from "@apollo/client/react"
import { FILTER_OPTIONS_QUERY } from "../../graphql/queries/filterOptions.js"

const EMPTY = {
  experienceLevels: [],
  workSettings: [],
  employmentTypes: [],
  companySizes: [],
  workYears: [],
}

export function useFilterOptions({ countryId, cityId }) {
  const hasRegion = Boolean(countryId || cityId)

  const { data, loading } = useQuery(FILTER_OPTIONS_QUERY, {
    variables: { countryId: countryId ?? null, cityId: cityId ?? null },
    skip: !hasRegion,
    fetchPolicy: "cache-first",
  })

  return {
    options: hasRegion && data ? data.filterOptions : EMPTY,
    loading: hasRegion && loading,
  }
}
