import { NextApiRequest, NextApiResponse } from 'next'

export interface SessionContent {
  accessToken: string
  refreshToken: string
  id: string
  name: string
}

export interface CurrentUser {
  accessToken: string
  refreshToken: string
  id: string
  name: string
}

export interface Request<T> extends NextApiRequest {
  body: T & string
}

export interface Response<U> extends NextApiResponse {}

export type ApiHandler<T, U> = (
  req: Request<T>,
  res: Response<U>
) => Promise<void> | void
