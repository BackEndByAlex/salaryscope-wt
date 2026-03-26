import { gql } from "@apollo/client"

export const FEATURES_QUERY = gql`
  query FeaturesSection {
    countries(limit: 6) {
      countries { id name employeeRecordCount }
    }
    salaryRecords(filters: { source: "jobs_in_data", limit: 100 }) {
      records {
        id
        salaryInUsd
        job { title }
        employeeCountry { name }
      }
    }
  }
`
