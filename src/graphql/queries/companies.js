import { gql } from "@apollo/client"

export const COMPANIES_FILTER_QUERY = gql`
  query CompaniesFilter($countryId: ID) {
    companies(countryId: $countryId, limit: 100) {
      companies {
        id
        name
      }
    }
  }
`
