import { User } from '../graphql/generated/graphql'

export interface SessionType {
  id: string
  name: string
  accessToken: string
  refreshToken: string
}

export interface CookieType {
  ['session-access-token']: string
  ['session-refresh-token']: string
  ['user-data']: User
}

type extractSessionType<T> = (cookies: CookieType) => T

export const extractSession = (cookies: {
  [key: string]: string
}): SessionType => {
  const accessToken = cookies['session-access-token']
  const refreshToken = cookies['session-refresh-token']
  const id = cookies['user-id']
  const name = cookies['user-name']

  return {
    accessToken,
    refreshToken,
    id,
    name,
  }
}

// export const extractSession: extractSessionType<SessionType> = (cookies) => {
//   const accessToken = cookies['session-access-token']
//   const refreshToken = cookies['session-refresh-token']
//   const user = cookies['user-data']

//   return {
//     accessToken,
//     refreshToken,
//     user,
//   }
// }
