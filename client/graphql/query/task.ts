import { gql } from '@apollo/client'

export const GET_TASKS = gql`
  query GetTasks($userId: String!) {
    allTask(
      where: { userId: { equals: $userId } }
      orderBy: [{ createdAt: desc }]
    ) {
      id
      title
      createdAt
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $id: String!) {
    createTask(data: { title: $title, user: { connect: { id: $id } } }) {
      id
      title
      userId
    }
  }
`
