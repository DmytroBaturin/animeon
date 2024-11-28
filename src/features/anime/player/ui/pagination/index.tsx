'use client'

import { useRelease } from '@/entities/anime/model'
import { Button } from '@/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const PlayerPagination = ({
  currentOrder,
}: {
  currentOrder: number
}) => {
  const { release } = useRelease()
  const episodes = release?.episodes
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeEpisode, setActiveEpisode] = useState<number | null>(
    Number(currentOrder),
  )

  const handleChangeOrder = (filterValue: number) => {
    setActiveEpisode(filterValue)
    const params = new URLSearchParams(searchParams.toString())

    if (filterValue === null) {
      params.delete('order')
    } else {
      params.set('order', filterValue.toString())
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div>
      <div className="flex-col flex gap-2">
        <div className="w-full flex-wrap flex gap-1.5">
          {episodes?.map((_, i) => (
            <Button
              onClick={() => {
                handleChangeOrder(i + 1)
              }}
              className={`w-fit ${
                activeEpisode === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
              key={i}
            >
              Серія {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
