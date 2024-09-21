import { userRegister } from '@/shared/api/auth/auth'
import { type RequestUserRegister } from '@/shared/api/model'

export const registration = ({
  password,
  username,
  password_repeat,
  email,
}: RequestUserRegister) => {
  userRegister(
    { password, username, password_repeat, email },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  ).then((res) => {
    console.log(res.data)
  })
}
