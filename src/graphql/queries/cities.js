import { gql } from "@apollo/client"

export const CITIES_QUERY = gql`
  query Cities($countryId: ID!) {
    cities(countryId: $countryId, limit: 100) {
      cities {
        id
        name
        state
      }
    }
  }
`
