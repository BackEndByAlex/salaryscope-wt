import { gql } from "@apollo/client"

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      createdAt
      githubConnected
      googleConnected
    }
  }
`

export const ME_WITH_RECORDS_QUERY = gql`
  query MeWithRecords {
    me {
      id
      email
      createdAt
      githubConnected
      googleConnected
      salaryRecords {
        id
        salary
        salaryCurrency
        salaryInUsd
        workYear
        experienceLevel
        employmentType
        workSetting
        companySize
        job {
          title
        }
        city {
          name
        }
        employeeCountry {
          name
        }
        createdAt
      }
    }
  }
`
