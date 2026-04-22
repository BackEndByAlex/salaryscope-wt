import { gql } from "@apollo/client"

export const SEARCH_RECORDS_QUERY = gql`
  query SearchRecords($query: String!, $limit: Int, $offset: Int) {
    searchRecords(query: $query, limit: $limit, offset: $offset) {
      records {
        id
        jobTitle
        jobCategory
        country
        countryId
        city
        cityId
        salary
        salaryInUsd
        experienceLevel
        workSetting
        workYear
        source
      }
      totalCount
      hasNextPage
    }
  }
`
