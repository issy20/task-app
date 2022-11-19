import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser } from './useCurrentUser'

export function useRequireLogin() {
  const { isAuthChecking, currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthChecking) return // まだ確認中
    if (!currentUser) router.push('/') // 未ログインだったのでリダイレクト
  }, [isAuthChecking, currentUser])
}
