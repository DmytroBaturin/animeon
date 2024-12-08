import { ReleasesPage } from '@/screens/releases/ui'
import { getAnimeList } from '@/shared/api/anime/anime'

export const runtime = 'edge'
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const animeList = await getAnimeList(searchParams, {
    next: {
      revalidate: 60,
    },
    cache: 'no-cache',
  })

  return <ReleasesPage animeList={animeList.data} />
}
