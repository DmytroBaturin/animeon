'use server'

import { Player } from '@/features/anime/player'
import { getAnimeEpisode } from '@/shared/api/anime/anime'
import { ErrorBoundary } from 'react-error-boundary'

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
  const currentOrder = searchParams.order || 1

  const release = await getAnimeEpisode(
    params.id,
    params.slug,
    searchParams.order || 1,
    {
      cache: 'no-cache',
    },
  )

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Player currentOrder={currentOrder} release={release.data} />
    </ErrorBoundary>
  )
}
