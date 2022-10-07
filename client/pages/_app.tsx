import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { AuthProvider, useAuth } from '../hooks/useAuth'
import { currentUserVar } from '../states/currentUser'
import { useEffect } from 'react'

function AppInit() {
  const currentUser = useReactiveVar(currentUserVar)
  const { getCurrentUser } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        // サーバーへのリクエスト getCurrentUser
        const res = await getCurrentUser()
        const data = await res.json()
        // console.log(data)
        // ログインユーザーの情報が取得できたらグローバルステートにセット
        currentUserVar({
          id: data.session.user.id,
          accessToken: data.session.accessToken,
          refreshToken: data.session.refreshToken,
        })
        console.log(currentUser, 'success')
      } catch {
        //　未ログイン時
        currentUserVar(null)
        console.log(currentUser, 'failed')
      }
    })()
  }, [])
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
        <AppInit />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
