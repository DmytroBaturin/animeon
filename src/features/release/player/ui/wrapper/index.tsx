'use client'

import { ResponseAnimeEpisode } from '@/shared/api/model'

import { Player } from '@/features/release/player'

export const PlayerWrapper = ({
  release,
}: {
  release: ResponseAnimeEpisode
}) => {
  return <Player release={release} />
}
