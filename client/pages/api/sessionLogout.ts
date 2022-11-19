import { useReactiveVar } from '@apollo/client'
import nookies, { destroyCookie } from 'nookies'
import { LogoutMutation } from '../../graphql/generated/graphql'
import { LOGOUT } from '../../graphql/query/user'
import { initializeApollo } from '../../lib/apolloClient'
import { extractSession } from '../../lib/extractSession'
import { ApiHandler, SessionContent } from '../../type'

interface HeadersType {
  headers: {
    [key: string]: string
  }
}

const sessionLogout: ApiHandler<SessionContent, {}> = async (req, res) => {
  if (req.method !== 'POST') return res.status(400).send('Not Found')
  const cookies = nookies.get({ req })
  const session = extractSession(cookies)
  const token = session?.refreshToken
  const client = initializeApollo(null, token)

  // console.log(session?.refreshToken)
  try {
    await client.mutate({
      mutation: LOGOUT,
    })
    destroyCookie({ res }, 'session-access-token', { path: '/' })
    destroyCookie({ res }, 'session-refresh-token', { path: '/' })
    destroyCookie({ res }, 'user-id', { path: '/' })
    destroyCookie({ res }, 'user-name', { path: '/' })
    destroyCookie({ res }, 'user-data', { path: '/' })
    // currentUserVar(null)
    // console.log(currentUser)
    res.status(200).json({ status: 'success' })
  } catch {
    console.warn('error')
  }
}

export default sessionLogout
