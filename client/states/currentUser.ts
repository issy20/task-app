import { makeVar } from '@apollo/client'

interface VarType {
  id: string
  accessToken: string
  refreshToken: string
}

export const currentUserVar = makeVar<VarType | null | undefined>(undefined)
