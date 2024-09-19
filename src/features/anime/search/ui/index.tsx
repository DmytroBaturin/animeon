'use client'

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/shared/components/ui/credenza'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import Image from 'next/image'
import search from '@/shared/assets/icons/search.svg'
import { AnimeCardRowSkeleton } from '@/entities/anime'
import { forwardRef } from 'react'

interface SearchAnimeProps {
  trigger?: React.ReactNode
}

export const SearchAnime = forwardRef<HTMLInputElement, SearchAnimeProps>(
  ({ trigger }: SearchAnimeProps, ref) => {
    return (
      <Credenza>
        <CredenzaTrigger asChild>
          {trigger || (
            <Button size="icon" variant="ghost">
              <Image src={search} alt="search" />{' '}
            </Button>
          )}
        </CredenzaTrigger>
        <CredenzaContent className="w-[100%] md:top-[30%] h-[40%] md:h-fit md:w-[60%]">
          <div className="flex flex-col gap-4" ref={ref}>
            <CredenzaHeader>
              <CredenzaTitle>
                <Input placeholder="Пошук..." />
              </CredenzaTitle>
            </CredenzaHeader>
            <CredenzaBody className="flex flex-col gap-3 h-fit">
              <AnimeCardRowSkeleton />
              <AnimeCardRowSkeleton />
              <AnimeCardRowSkeleton />
              <AnimeCardRowSkeleton />
            </CredenzaBody>
          </div>
        </CredenzaContent>
      </Credenza>
    )
  },
)

SearchAnime.displayName = 'SearchAnime'
