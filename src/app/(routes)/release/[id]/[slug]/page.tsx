import { Player } from '@/features/release/player'
import { getAnimeEpisode } from '@/shared/api/anime/anime'

export const runtime = 'edge'

export default async function Page({
  params,
  searchParams,
}: {
  searchParams: { order: number }
  params: {
    id: string
    slug: string
  }
}) {
  const release = await getAnimeEpisode(
    params.id,
    params.slug,
    searchParams.order || 1,
    {
      cache: 'no-cache',
    },
  )

  return <Player release={release.data} />
}
