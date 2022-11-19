import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Home } from '../components/Home'

import { useAuth } from '../hooks/useAuth'
import { useRequireLogin } from '../hooks/useRequireLogin'

export interface LoginStateType {
  email: string
  password: string
}

export interface SignUpStateType {
  name: string
  email: string
  password: string
}

const Index: NextPage = () => {
  useRequireLogin()

  const router = useRouter()
  const { signIn, signUp } = useAuth()

  const [frag, setFrag] = useState(false)
  const [loginUser, setLoginUser] = useState<LoginStateType>({
    email: '',
    password: '',
  })
  const [signUpUser, setSignUpUser] = useState<SignUpStateType>({
    name: '',
    email: '',
    password: '',
  })

  const loginOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await signIn(loginUser)
    router.push('/task')
  }

  const signUpOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await signUp(signUpUser)
    router.push('/task')
  }

  return (
    <Home
      loginUser={loginUser}
      signUpUser={signUpUser}
      frag={frag}
      setFrag={setFrag}
      setLoginUser={setLoginUser}
      setSignUpUser={setSignUpUser}
      loginOnSubmit={loginOnSubmit}
      signUpOnSubmit={signUpOnSubmit}
    />
  )
}

export default Index
