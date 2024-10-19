'use client'

import { useRelease } from '@/entities/anime/model'
import { Button } from '@/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/shared/components/ui/input'
import { ArrowUp } from 'lucide-react'

export const PlayerPagination = () => {
  const { release } = useRelease()
  const episodes = release?.episodes
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(0)
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null) // state to track active episode
  const episodesPerPage = 8
  const totalPages = Math.ceil(episodes?.length / episodesPerPage)

  const handleChangeOrder = (filterValue: number) => {
    setActiveEpisode(filterValue)
    const params = new URLSearchParams(searchParams.toString())

    if (filterValue) {
      params.set('order', filterValue.toString())
    } else {
      params.delete('order')
    }

    router.push(`?${params.toString()}`)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const generateEpisodeButtons = () => {
    const episodes = []
    const start = currentPage * episodesPerPage + 1
    const end = Math.min(start + episodesPerPage - 1, 100)

    for (let i = start; i <= end; i++) {
      episodes.push(
        <Button
          key={i}
          onClick={() => handleChangeOrder(i)}
          className={i === activeEpisode ? 'border border-blue-500' : ''} // add border if active
        >
          {`Серія ${i}`}
        </Button>,
      )
    }
    return episodes
  }

  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <div className="flex w-full justify-between">
        <Button onClick={handlePrevPage}>
          <ArrowUp className="-rotate-90" />
        </Button>
        <div className="flex flex-wrap gap-2">{generateEpisodeButtons()}</div>
        <Button onClick={handleNextPage}>
          {' '}
          <ArrowUp className="rotate-90" />
        </Button>
      </div>
      <div>
        <Input
          placeholder="№ Серії"
          className="justify-center items-center"
          type="number"
        />
      </div>
    </div>
  )
}
