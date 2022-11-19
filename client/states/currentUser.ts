import { makeVar } from '@apollo/client'
import { SessionContent } from '../type'
import { atom } from 'recoil'
import { CurrentUser } from '../type' // ログインユーザーの型定義

// export const currentUserVar =
//   makeVar<SessionContent | null | undefined>(undefined)

// undefined : まだログイン確認が完了していない状態とする
// null      : ログイン確認をした結果、ログインしていなかった状態とする
export const currentUserState = atom<CurrentUser | undefined>({
  key: 'CurrentUser',
  default: undefined,
})
