import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const res = await fetch(`api/auth/endpoint`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
          credentials: 'include',
        })
      },
    }),
  ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
