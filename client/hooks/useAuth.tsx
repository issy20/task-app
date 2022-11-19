import { useReactiveVar } from '@apollo/client'
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  CreateUserMutation,
  LoginMutation,
  LoginUserInput,
  TaskCreateInput,
  UserCreateInput,
} from '../graphql/generated/graphql'
import { CREATE_TASK } from '../graphql/query/task'
import { CREATE_USER, LOGIN } from '../graphql/query/user'
import { initializeApollo } from '../lib/apolloClient'
import { currentUserState } from '../states/currentUser'
// import { currentUserVar } from '../states/currentUser'

interface Props {
  children: ReactNode
}

interface AuthContextInterface {
  signIn: ({ email, password }: LoginUserInput) => Promise<void>
  signUp: ({ name, email, password }: UserCreateInput) => Promise<void>
  signOut: () => Promise<void>
  getCurrentUser: () => Promise<Response>
}

const authContext = createContext({} as AuthContextInterface)

export const AuthProvider: FC<Props> = ({ children }: Props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

export const useProvideAuth = () => {
  // const currentUser = useReactiveVar(currentUserVar)
  const setCurrentUser = useSetRecoilState(currentUserState)

  const getCurrentUser = async () => {
    const res = await fetch('/api/session')
    return res
  }

  const signIn = async ({ email, password }: LoginUserInput) => {
    const client = initializeApollo()
    // login mutation
    const result = await client.mutate<LoginMutation, LoginUserInput>({
      mutation: LOGIN,
      variables: { email, password },
    })

    const user = result.data?.login.user
    const accessToken = result.data?.login.access_token
    const refreshToken = result.data?.login.refresh_token
    localStorage.setItem('accessToken', accessToken!)
    const body = { user, accessToken, refreshToken }

    await fetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({ body }),
    })
  }

  const signUp = async ({ name, email, password }: UserCreateInput) => {
    const client = initializeApollo()
    // create user mutation
    const result = await client.mutate<CreateUserMutation, UserCreateInput>({
      mutation: CREATE_USER,
      variables: { name, email, password },
    })

    // login処理
    if (result.data?.createUser.id) {
      return signIn({ email: result.data.createUser.email, password })
    }
  }

  const signOut = async () => {
    await fetch('/api/sessionLogout', { method: 'POST' }).then(() =>
      setCurrentUser(undefined)
    )
  }

  return {
    signIn,
    signUp,
    getCurrentUser,
    signOut,
  }
}
