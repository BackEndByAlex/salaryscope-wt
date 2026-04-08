import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
      }
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`

export const GOOGLE_LOGIN_MUTATION = gql`
  mutation GoogleLogin($input: GoogleLoginInput!) {
    googleLogin(input: $input) {
      user {
        id
        email
      }
    }
  }
`

export const GITHUB_LOGIN_MUTATION = gql`
  mutation GitHubLogin($input: GitHubLoginInput!) {
    githubLogin(input: $input) {
      user {
        id
        email
      }
    }
  }
`
