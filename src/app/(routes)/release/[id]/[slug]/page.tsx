'use client'

import { useEffect, useState } from 'react'
import { getAnimeEpisode } from '@/shared/api/anime/anime'
import { PlayerWrapper } from '@/features/release/player'
import { ResponseAnimeEpisode } from '@/shared/api/model'

export default function Page({
  params,
  searchParams,
}: {
  searchParams: { order: number }
  params: {
    id: string
    slug: string
  }
}) {
  const [release, setRelease] = useState<ResponseAnimeEpisode | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchEpisode() {
      setLoading(true)
      try {
        const response = await getAnimeEpisode(
          params.id,
          params.slug,
          searchParams.order || 1,
          {
            cache: 'no-cache',
          },
        )
        setRelease(response.data)
      } catch (error) {
        console.error('Failed to fetch episode:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEpisode()
  }, [params.id, params.slug, searchParams.order])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!release) {
    return <div>Серія недоступна</div>
  }

  return <PlayerWrapper release={release} />
}
