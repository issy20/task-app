import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { AuthProvider, useAuth } from '../hooks/useAuth'
// import { currentUserVar } from '../states/currentUser'
import { useEffect } from 'react'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import { currentUserState } from '../states/currentUser'
import { useRouter } from 'next/router'

function AppInit() {
  // const currentUser = useReactiveVar(currentUserVar)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const { getCurrentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        // サーバーへのリクエスト getCurrentUser
        const res = await getCurrentUser()
        const data = await res.json()
        if (data.session.id == undefined) {
          throw new Error('data is undefined')
        }
        // ログインユーザーの情報が取得できたらグローバルステートにセット
        setCurrentUser({
          id: data.session.id,
          name: data.session.name,
          accessToken: data.session.accessToken,
          refreshToken: data.session.refreshToken,
        })
        // console.log(currentUser, 'success')
      } catch {
        //　未ログイン時
        setCurrentUser(undefined)
        // console.log(currentUser, 'failed')
      }
    })()
  }, [router.pathname])
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <RecoilRoot>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
          <AppInit />
        </ApolloProvider>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
