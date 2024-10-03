'use client'

import '@/shared/components/ui/player.css'
import { PlayerPagination } from '@/features/release/player/ui/pagination'
import { PlayerVoiceOverSelect } from '@/features/release/player/ui/voiceover-select'
import { ReleasePlayer } from '@/features/release/player/ui/player'
import { EpisodeVoiceover, ResponseAnimeEpisode } from '@/shared/api/model'
import { usePlayerModel } from '@/features/release/player/model'
import { useEffect } from 'react'

export const Player = ({ release }: { release: ResponseAnimeEpisode }) => {
  const { voiceOver, setVoiceOver } = usePlayerModel()

  useEffect(() => {
    if (
      release.voiceover &&
      release.voiceover[0] &&
      release.voiceover[0].file
    ) {
      setVoiceOver(release.voiceover[0].file as string)
    }
  }, [])
  console.log(voiceOver)
  return (
    <div className="flex flex-col gap-3">
      <PlayerVoiceOverSelect
        voiceovers={release?.voiceover as EpisodeVoiceover[]}
      />
      {release?.voiceover?.length > 0 && release.voiceover[0]?.file ? (
        <ReleasePlayer
          timemarkers={{
            end_ending: release.end_ending ?? 0,
            start_opening: release.start_opening ?? 0,
            end_opening: release.end_opening ?? 0,
            start_ending: release.start_ending ?? 0,
          }}
          src={
            'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8' ??
            ''
          }
        />
      ) : (
        <div>Серія недоступна</div>
      )}

      <PlayerPagination />
    </div>
  )
}
