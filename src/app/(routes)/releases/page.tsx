import { ReleasesPage } from '@/screens/releases/ui'
import { getAnimeList } from '@/shared/api/anime/anime'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const animeList = await getAnimeList(
    {
      ...searchParams,
    },
    {
      cache: 'no-cache',
    },
  )

  return <ReleasesPage animeList={animeList.data} />
}
