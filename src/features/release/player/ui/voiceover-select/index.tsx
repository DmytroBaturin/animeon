'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import type { EpisodeVoiceover } from '@/shared/api/model'
import { usePlayerModel } from '@/features/release/player/model'
import { useState } from 'react'

export const PlayerVoiceOverSelect = ({
  voiceovers,
}: {
  voiceovers?: EpisodeVoiceover[] | undefined
}) => {
  const { setVoiceOver } = usePlayerModel()
  const [selectedVoiceover, setSelectedVoiceover] = useState(
    voiceovers ? voiceovers[0].value : '',
  )
  return voiceovers && voiceovers.length > 0 ? (
    <Select
      defaultValue={voiceovers[0].file}
      onValueChange={(url) => {
        setVoiceOver(url)
        const selected = voiceovers.find((val) => val.file === url)
        if (selected) {
          setSelectedVoiceover(selected.value)
        }
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Озвучка: ">{`Озвучка: ${selectedVoiceover}`}</SelectValue>{' '}
      </SelectTrigger>
      <SelectContent>
        {voiceovers.map((val) => (
          <SelectItem key={val.file} value={val.file || ''}>
            {val.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : null
}
