import NextAuth from 'next-auth'
import { userLogin } from '@/shared/api/auth/auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials)
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required.')
        }
        try {
          const res = await userLogin(
            {
              username: 'admin',
              password: 'admin',
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log(res.data)

          if (res && res.data) {
            return {
              username: credentials.username,
              token: res.data.access,
            }
          }
          return null
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECURE_CODE,
})

export { handler as GET, handler as POST }
