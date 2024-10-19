import { UserPage } from '@/screens/user'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { routes } from '@/shared/config/routes'
import { userRead } from '@/shared/api/user/user'
import { checkSession } from '@/entities/session'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await checkSession()

  if (!session) {
    return redirect(routes.login)
  }

  const user = await userRead({
    headers: {
      Authorization: `Bearer ${session}`,
    },
  })
  return <UserPage user={user.data}>{children}</UserPage>
}
