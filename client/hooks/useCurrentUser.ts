import { useReactiveVar } from '@apollo/client'
// import { currentUserVar } from '../states/currentUser'

// export const useCurrentUser = () => {
//   const currentUser = useReactiveVar(currentUserVar)
//   //ログイン情報を取得中かどうか
//   //initlal false
//   const isAuthChecking = currentUser === undefined

//   return {
//     currentUser,
//     isAuthChecking,
//   }
// }

import { useRecoilValue } from 'recoil'
import { currentUserState } from '../states/currentUser'

export function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserState) // グローバルステートからcurrentUserを取り出す
  const isAuthChecking = currentUser === undefined // ログイン情報を取得中かどうか

  return {
    currentUser,
    isAuthChecking,
  }
}
