import { ProfileAnimeList } from '@/widgets/profile/ui/list'
import { checkSession } from '@/entities/session'
import { userAnimeList } from '@/shared/api/user/user'
import { redirect } from 'next/navigation'
import { routes } from '@/shared/config/routes'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  console.log(searchParams)
  const session = await checkSession()
  if (!session) {
    return redirect(routes.login)
  }
  const list = await userAnimeList(searchParams, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  })
  return <ProfileAnimeList list={list.data} />
}
