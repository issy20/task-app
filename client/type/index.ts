import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../graphql/generated/graphql'

export interface SessionContent {
  accessToken: string
  refreshToken: string
  user: User
}

export interface Request<T> extends NextApiRequest {
  body: T & string
}

export interface Response<U> extends NextApiResponse {}

export type ApiHandler<T, U> = (
  req: Request<T>,
  res: Response<U>
) => Promise<void> | void
