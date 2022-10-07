import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Home } from '../components/Home'

import { useAuth } from '../hooks/useAuth'

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
  const router = useRouter()
  const { signIn, signUp } = useAuth()

  const [frag, setFrag] = useState(false)
  const [loginUser, setLoginUser] = useState<LoginStateType>({
    email: 'test@example.com',
    password: 'password12345',
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

  const signUpOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    signUp(signUpUser)
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

// test user
// test@example.com
// password12345
