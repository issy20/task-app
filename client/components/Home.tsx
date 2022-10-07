import { FC } from 'react'
import { LoginStateType, SignUpStateType } from '../pages'
import { Layout } from './Layout'

interface Props {
  frag: boolean
  signUpOnSubmit: (e: React.SyntheticEvent) => void
  signUpUser: SignUpStateType
  setSignUpUser: React.Dispatch<React.SetStateAction<SignUpStateType>>
  loginOnSubmit: (e: React.SyntheticEvent) => Promise<void>
  loginUser: LoginStateType
  setLoginUser: React.Dispatch<React.SetStateAction<LoginStateType>>
  setFrag: React.Dispatch<React.SetStateAction<boolean>>
}

export const Home: FC<Props> = ({
  frag,
  signUpOnSubmit,
  signUpUser,
  setSignUpUser,
  loginOnSubmit,
  loginUser,
  setLoginUser,
  setFrag,
}) => {
  return (
    <Layout>
      <h1 className="">Next.js + NestJS + AWS Fargate</h1>
      {frag ? (
        <form onSubmit={signUpOnSubmit} className="flex flex-col">
          <input
            type="text"
            className="bg-gray-100 rounded mt-8 px-2 py-1"
            placeholder="name"
            value={signUpUser.name}
            onChange={(e) =>
              setSignUpUser({ ...signUpUser, name: e.target.value })
            }
          />
          <input
            type="email"
            className="bg-gray-100 rounded mt-2 px-2 py-1"
            placeholder="email"
            value={signUpUser.email}
            onChange={(e) =>
              setSignUpUser({ ...signUpUser, email: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-gray-100 rounded mt-2 px-2 py-1"
            placeholder="password"
            value={signUpUser.password}
            onChange={(e) =>
              setSignUpUser({ ...signUpUser, password: e.target.value })
            }
          />
          <button className="bg-gray-100 rounded mt-4 px-2 py-1">
            Sign Up
          </button>
        </form>
      ) : (
        <form className="flex flex-col" onSubmit={loginOnSubmit}>
          <input
            type="email"
            className="bg-gray-100 rounded mt-8 px-2 py-1"
            placeholder="email"
            value={loginUser.email}
            onChange={(e) =>
              setLoginUser({ ...loginUser, email: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-gray-100 rounded mt-2 px-2 py-1"
            placeholder="password"
            value={loginUser.password}
            onChange={(e) =>
              setLoginUser({ ...loginUser, password: e.target.value })
            }
          />
          <button type="submit" className="bg-gray-100 rounded mt-4 px-2 py-1">
            Login
          </button>
        </form>
      )}

      <button
        className="hover:border-b hover:text-blue-700 text-xs mt-3"
        onClick={() => setFrag(!frag)}
      >
        {frag
          ? 'アカウントを作成済みの場合'
          : 'アカウントをまだ作成してない場合'}
      </button>
    </Layout>
  )
}
