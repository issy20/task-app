import { NextPage } from 'next'
import { Layout } from '../components/Layout'

import { SessionType } from '../lib/extractSession'
import { GetTasksQuery } from '../graphql/generated/graphql'
import { CREATE_TASK, GET_TASKS } from '../graphql/query/task'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useRequireLogin } from '../hooks/useRequireLogin'

interface Props {
  data: GetTasksQuery
  session: SessionType
}

export interface TaskCreateState {
  title: string
}

const Task: NextPage<Props> = () => {
  useRequireLogin()
  const { isAuthChecking, currentUser } = useCurrentUser()

  const [taskState, setTaskState] = useState<TaskCreateState>({
    title: '',
  })

  const { data, error, loading } = useQuery<GetTasksQuery>(GET_TASKS, {
    variables: {
      userId: currentUser?.id,
    },
  })

  const { signOut } = useAuth()
  const router = useRouter()

  const onSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const [createTaskMutation] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTaskMutation } }) {
      const cacheId = cache.identify(createTaskMutation)
      cache.modify({
        fields: {
          allTask(existingTasks, { toReference }) {
            if (cacheId) return [toReference(cacheId), ...existingTasks]
          },
        },
      })
    },
  })

  const createOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    await createTaskMutation({
      variables: { title: taskState.title, id: currentUser?.id },
    })
  }

  if (isAuthChecking) return <div>ログイン情報を確認中…</div>

  return (
    <Layout>
      <h1 className="text-md">{currentUser?.name}</h1>
      <h1 className="text-md">Task List</h1>
      <form className="flex flex-col" onSubmit={createOnSubmit}>
        <input
          type="text"
          className="bg-gray-100 rounded mt-2 px-2 py-1"
          placeholder="task"
          value={taskState.title}
          onChange={(e) =>
            setTaskState({ ...taskState, title: e.target.value })
          }
        />
        <button className="bg-gray-100 rounded mt-4 px-2 py-1">Add Task</button>
      </form>
      <ul>
        {data?.allTask.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <br />
      <button onClick={onSignOut}>Logout</button>
    </Layout>
  )
}

export default Task
