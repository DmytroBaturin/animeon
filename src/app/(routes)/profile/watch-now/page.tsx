import { ProfileAnimeList } from '@/widgets/profile/ui/list'
import { checkSession } from '@/entities/session'
import { userAnimeList } from '@/shared/api/user/user'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const session = await checkSession()

  const list = await userAnimeList(
    {
      action: 'WATCHING',
      ...searchParams,
    },
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    },
  )
  return <ProfileAnimeList type="WATCHING" list={list.data} />
}
