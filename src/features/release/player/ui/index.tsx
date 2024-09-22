'use client'

import PlyrComponent from '@/shared/components/ui/player'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { useEffect, useState } from 'react'
import { useReleaseModel } from '@/screens/release/model'
import { getAnimeEpisode } from '@/shared/api/anime/anime'

export const Player = ({ id, slug }: { id: string; slug: string }) => {
  const [voice, setVoice] = useState('light')
  const { initOrder } = useReleaseModel()
  const [order, setOrder] = useState<number>(initOrder)

  useEffect(() => {
    getAnimeEpisode(id, slug, order)
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <Select onValueChange={(value) => setVoice(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Озвучка: ">{`Озвучка: ${voice}`}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <PlyrComponent
        hlsSource="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
        videoOptions={{
          ratio: '16:9',
          autoplay: false,
        }}
      />
    </div>
  )
}
