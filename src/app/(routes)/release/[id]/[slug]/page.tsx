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
    <ErrorBoundary
      fallback={
        <div className="flex items-center py-4 justify-center h-full">
          <span className="text-sm text-muted-foreground">
            Щось пішло не так
          </span>
        </div>
      }
    >
      <Player currentOrder={currentOrder} release={release.data} />
    </ErrorBoundary>
  )
}
