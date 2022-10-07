import { useReactiveVar } from '@apollo/client'
import { currentUserVar } from '../states/currentUser'

export const useCurrentUser = () => {
  const currentUser = useReactiveVar(currentUserVar)
  //ログイン情報を取得中かどうか
  //initlal false
  const isAuthChecking = currentUser === undefined

  return {
    currentUser,
    isAuthChecking,
  }
}
