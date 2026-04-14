import { gql } from "@apollo/client"

export const FILTER_OPTIONS_QUERY = gql`
  query FilterOptions($countryId: ID, $cityId: ID) {
    filterOptions(countryId: $countryId, cityId: $cityId) {
      experienceLevels
      workSettings
      employmentTypes
      companySizes
      workYears
    }
  }
`
