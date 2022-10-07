import { NextApiRequest, NextApiResponse } from 'next'
import nookies, { setCookie } from 'nookies'
import { User } from '../../graphql/generated/graphql'
import { extractSession } from '../../lib/extractSession'
import { ApiHandler, SessionContent } from '../../type'

// interface ExtendedNextApiRequest<T> extends NextApiRequest {
//   body: T & string
// }

const sessionApi: ApiHandler<SessionContent, {}> = async (req, res) => {
  const options = {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
  }

  if (req.method === 'GET') {
    const cookies = nookies.get({ req })
    const session = extractSession(cookies)
    res.status(200).json({ session })
  } else if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    // console.log(data.body)
    setCookie({ res }, 'session-access-token', data.body.accessToken, options)
    setCookie({ res }, 'user-data', JSON.stringify(data.body.user), options)
    setCookie({ res }, 'session-refresh-token', data.body.refreshToken, options)

    res.status(200).json({ data })
  }
}

export default sessionApi
