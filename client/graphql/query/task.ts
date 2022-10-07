import { gql } from '@apollo/client'

export const GET_TASKS = gql`
  query GetTasks($userId: String!) {
    allTask(where: { userId: { equals: $userId } }) {
      id
      title
      createdAt
    }
  }
`
