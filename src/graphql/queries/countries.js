import { gql } from "@apollo/client"

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries(limit: 100) {
      countries {
        id
        name
        employeeRecordCount
      }
    }
  }
`
