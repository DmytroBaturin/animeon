'use client'

import '@/shared/components/ui/player.css'
import { PlayerPagination } from '@/features/anime/player/ui/pagination'
import { PlayerVoiceOverSelect } from '@/features/anime/player/ui/voiceover-select'
import { EpisodeVoiceover, ResponseAnimeEpisode } from '@/shared/api/model'
import { usePlayerModel } from '@/features/anime/player/model'
import { useEffect } from 'react'
import { ReleasePlayer } from '@/features/anime/player/ui/player'

export const Player = ({ release }: { release: ResponseAnimeEpisode }) => {
  const { voiceOver, setVoiceOver } = usePlayerModel()

  useEffect(() => {
    if (
      release.voiceover &&
      release.voiceover.length > 0 &&
      release.voiceover[0].file
    ) {
      setVoiceOver(release.voiceover[0].file as string)
    }
  }, [release, setVoiceOver])

  return (
    <div className="flex flex-col gap-3">
      <PlayerVoiceOverSelect
        voiceovers={release?.voiceover as EpisodeVoiceover[]}
      />
      {release?.voiceover &&
      release.voiceover.length > 0 &&
      release.voiceover[0]?.file ? (
        <ReleasePlayer
          timemarkers={{
            end_ending: release.end_ending ?? 0,
            start_opening: release.start_opening ?? 0,
            end_opening: release.end_opening ?? 0,
            start_ending: release.start_ending ?? 0,
          }}
          src={voiceOver ?? ''}
        />
      ) : (
        <div className="w-full items-center h-[400px] justify-center flex">
          <h1 className="font-bold text-2xl">Серія недоступна</h1>
        </div>
      )}

      <PlayerPagination />
    </div>
  )
}
