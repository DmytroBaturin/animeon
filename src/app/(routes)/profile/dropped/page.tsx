import { ProfileAnimeList } from '@/widgets/profile/ui/list'
import { userAnimeList } from '@/shared/api/user/user'
import { checkSession } from '@/entities/session'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const session = await checkSession()

  const list = await userAnimeList(
    {
      action: 'DROPPED',
      ...searchParams,
    },
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    },
  )
  return <ProfileAnimeList type="DROPPED" list={list.data} />
}
