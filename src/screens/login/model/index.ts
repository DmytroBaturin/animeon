import { userLogin } from '@/shared/api/auth/auth'
import { TokenObtainPair } from '@/shared/api/model'

export const login = ({ password, username }: TokenObtainPair) => {
  userLogin(
    { password, username },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  ).then((res) => {
    console.log(res.data)
  })
}
