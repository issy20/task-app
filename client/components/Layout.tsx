import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen tetx-gray-600 text-sm font-mono">
      <div className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </div>
    </div>
  )
}
