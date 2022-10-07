export const extractSession = (cookies: { [key: string]: string }) => {
  const accessToken = cookies['session-access-token']
  const refreshToken = cookies['session-refresh-token']
  const user = cookies['user-data']

  if (accessToken && refreshToken && user)
    return {
      accessToken,
      refreshToken,
      user: JSON.parse(user),
    }

  return null
}
