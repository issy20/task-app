import { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../components/Layout'
import { initializeApollo } from '../lib/apolloClient'
import nookies from 'nookies'
import { extractSession } from '../lib/extractSession'
import {
  GetTasksQuery,
  GetTasksQueryVariables,
  User,
} from '../graphql/generated/graphql'
import { GET_TASKS } from '../graphql/query/task'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

interface Props {
  data: GetTasksQuery
  user: User
}

const Task: NextPage<Props> = ({ data, user }) => {
  const { signOut } = useAuth()
  const router = useRouter()

  const onSignOut = async () => {
    await signOut()
    router.push('/')
  }
  return (
    <Layout>
      <h1 className="text-md">{user.name}</h1>
      <h1 className="text-md">Task List</h1>
      <ul>
        {data.allTask.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <br />
      <button onClick={onSignOut}>Logout</button>
    </Layout>
  )
}

export default Task

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const session = extractSession(cookies)
  const token = session?.accessToken
  const userId = session?.user.id
  const client = initializeApollo(null, token)
  const res = await client.query<GetTasksQuery, GetTasksQueryVariables>({
    query: GET_TASKS,
    variables: {
      userId,
    },
  })

  return {
    props: {
      data: res.data,
      user: session?.user,
    },
  }
}
