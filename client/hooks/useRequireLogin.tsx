import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCurrentUser } from './useCurrentUser'

export const useRequireLogin = () => {
  const { isAuthChecking, currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthChecking) return // まだ確認中
    if (!currentUser) router.push('/') // 未ログインだったのでリダイレクト
  }, [isAuthChecking, currentUser])
}
