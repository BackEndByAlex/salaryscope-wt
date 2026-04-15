import { gql } from "@apollo/client"

export const CREATE_SALARY_RECORD = gql`
  mutation CreateSalaryRecord($input: CreateSalaryRecordInput!) {
    createSalaryRecord(input: $input) {
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
`

export const UPDATE_SALARY_RECORD = gql`
  mutation UpdateSalaryRecord($id: ID!, $input: UpdateSalaryRecordInput!) {
    updateSalaryRecord(id: $id, input: $input) {
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
`

export const DELETE_SALARY_RECORD = gql`
  mutation DeleteSalaryRecord($id: ID!) {
    deleteSalaryRecord(id: $id)
  }
`
