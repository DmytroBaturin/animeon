'use client'

import { ListLayout } from '@/shared/layouts/list'
import { AnimeCard } from '@/entities/anime'
import { useRelease } from '@/entities/anime/model'

export const ReleaseSimilar = () => {
  const { release } = useRelease()
  return (
    <ListLayout>
      {release && (
        <>
          {release?.similar?.length === 0 && (
            <h1 className="w-full items-center font-bold text-[42px] justify-center flex">
              Нічого не знайдено 🥲
            </h1>
          )}
          {release?.similar?.map((anime) => (
            <AnimeCard key={anime.id} {...anime} />
          ))}
        </>
      )}
    </ListLayout>
  )
}
