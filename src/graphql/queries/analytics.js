import { gql } from "@apollo/client"

export const ANALYTICS_OVERVIEW_QUERY = gql`
  query AnalyticsOverview {
    salaryRecords(filters: { limit: 1 }) {
      totalCount
    }
    countries(limit: 1) {
      totalCount
    }
    companies(limit: 1) {
      totalCount
    }
    jobCategories(limit: 1) {
      totalCount
    }
  }
`

export const ANALYTICS_CHARTS_QUERY = gql`
  query AnalyticsCharts {
    countries(limit: 20) {
      countries {
        id
        name
        employeeRecordCount
        companyCount
      }
    }
    companies(limit: 20) {
      companies {
        id
        name
        rating
        country {
          name
        }
      }
    }
    jobCategories(limit: 100) {
      jobCategories {
        id
        name
        jobCount
      }
    }
  }
`

export const ANALYTICS_BREAKDOWN_QUERY = gql`
  query AnalyticsBreakdown {
    entry: salaryRecords(filters: { experienceLevel: "EN", limit: 1 }) {
      totalCount
    }
    mid: salaryRecords(filters: { experienceLevel: "MI", limit: 1 }) {
      totalCount
    }
    senior: salaryRecords(filters: { experienceLevel: "SE", limit: 1 }) {
      totalCount
    }
    executive: salaryRecords(filters: { experienceLevel: "EX", limit: 1 }) {
      totalCount
    }
    remote: salaryRecords(filters: { workSetting: "Remote", limit: 1 }) {
      totalCount
    }
    hybrid: salaryRecords(filters: { workSetting: "Hybrid", limit: 1 }) {
      totalCount
    }
    inPerson: salaryRecords(filters: { workSetting: "In-person", limit: 1 }) {
      totalCount
    }
  }
`
