import { gql } from "@apollo/client"

export const COUNTRY_SIDEBAR_QUERY = gql`
  query CountrySidebar($countryId: ID!) {
    total: salaryRecords(filters: { countryId: $countryId, limit: 1 }) {
      totalCount
    }
    entry: salaryRecords(
      filters: { countryId: $countryId, experienceLevel: "EN", limit: 1 }
    ) {
      totalCount
    }
    mid: salaryRecords(
      filters: { countryId: $countryId, experienceLevel: "MI", limit: 1 }
    ) {
      totalCount
    }
    senior: salaryRecords(
      filters: { countryId: $countryId, experienceLevel: "SE", limit: 1 }
    ) {
      totalCount
    }
    executive: salaryRecords(
      filters: { countryId: $countryId, experienceLevel: "EX", limit: 1 }
    ) {
      totalCount
    }
    remote: salaryRecords(
      filters: { countryId: $countryId, workSetting: "Remote", limit: 1 }
    ) {
      totalCount
    }
    hybrid: salaryRecords(
      filters: { countryId: $countryId, workSetting: "Hybrid", limit: 1 }
    ) {
      totalCount
    }
    inPerson: salaryRecords(
      filters: { countryId: $countryId, workSetting: "In-person", limit: 1 }
    ) {
      totalCount
    }
  }
`

export const CITY_SIDEBAR_QUERY = gql`
  query CitySidebar($cityId: ID!) {
    total: salaryRecords(filters: { cityId: $cityId, limit: 1 }) {
      totalCount
    }
    entry: salaryRecords(
      filters: { cityId: $cityId, experienceLevel: "EN", limit: 1 }
    ) {
      totalCount
    }
    mid: salaryRecords(
      filters: { cityId: $cityId, experienceLevel: "MI", limit: 1 }
    ) {
      totalCount
    }
    senior: salaryRecords(
      filters: { cityId: $cityId, experienceLevel: "SE", limit: 1 }
    ) {
      totalCount
    }
    executive: salaryRecords(
      filters: { cityId: $cityId, experienceLevel: "EX", limit: 1 }
    ) {
      totalCount
    }
    remote: salaryRecords(
      filters: { cityId: $cityId, workSetting: "Remote", limit: 1 }
    ) {
      totalCount
    }
    hybrid: salaryRecords(
      filters: { cityId: $cityId, workSetting: "Hybrid", limit: 1 }
    ) {
      totalCount
    }
    inPerson: salaryRecords(
      filters: { cityId: $cityId, workSetting: "In-person", limit: 1 }
    ) {
      totalCount
    }
  }
`

// Paginated salary records list — pass either countryId or cityId, leave the other null
export const SALARY_LIST_QUERY = gql`
  query SalaryList(
    $countryId: ID
    $cityId: ID
    $offset: Int
    $experienceLevel: String
    $workSetting: String
    $workYear: Int
    $employmentType: String
    $companySize: String
    $companyId: ID
  ) {
    salaryRecords(
      filters: {
        countryId: $countryId
        cityId: $cityId
        experienceLevel: $experienceLevel
        workSetting: $workSetting
        workYear: $workYear
        employmentType: $employmentType
        companySize: $companySize
        companyId: $companyId
        limit: 10
        offset: $offset
      }
    ) {
      totalCount
      hasNextPage
      records {
        id
        salaryInUsd
        experienceLevel
        workSetting
        workYear
        employmentType
        job { title }
        company { name }
      }
    }
  }
`
