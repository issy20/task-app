import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      user {
        id
        name
        email
      }
      access_token
      refresh_token
    }
  }
`

export const GET_USER = gql`
  query GetUser($email: String!) {
    user(where: { email: { equals: $email } }) {
      id
      email
      name
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
