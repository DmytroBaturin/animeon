'use client'

import '@/shared/components/ui/player.css'
import { PlayerPagination } from '@/features/anime/player/ui/pagination'
import { EpisodeVoiceover, ResponseAnimeEpisode } from '@/shared/api/model'
import { usePlayerModel } from '@/features/anime/player/model'
import { useEffect } from 'react'
import { ReleasePlayer } from '@/features/anime/player/ui/player'
import { PlayerVoiceOverSelect } from '@/features/anime/player/ui/voiceover-select'

export const Player = ({
  release,
  currentOrder,
}: {
  release?: ResponseAnimeEpisode
  currentOrder: number
}) => {
  const { voiceOver, setVoiceOver } = usePlayerModel()

  useEffect(() => {
    if (
      release?.voiceover &&
      release.voiceover.length > 0 &&
      release.voiceover[0].url
    ) {
      setVoiceOver(release.voiceover[0].url as string)
    }
  }, [release, setVoiceOver])

  return (
    <div className="flex flex-col gap-3">
      {release?.voiceover && release.voiceover.length > 0 ? (
        <>
          <PlayerVoiceOverSelect
            voiceovers={release.voiceover as EpisodeVoiceover[]}
          />
          <ReleasePlayer
            timemarkers={{
              end_ending: release.end_ending ?? 0,
              start_opening: release.start_opening ?? 0,
              end_opening: release.end_opening ?? 0,
              start_ending: release.start_ending ?? 0,
            }}
            src={voiceOver ?? ''}
          />
        </>
      ) : (
        <div className="w-full items-center h-[400px] justify-center flex">
          <h1 className="font-bold text-2xl">Серія недоступна</h1>
        </div>
      )}
      <PlayerPagination currentOrder={currentOrder} />
    </div>
  )
}
