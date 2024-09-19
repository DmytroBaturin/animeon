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

interface SearchAnimeProps {
  trigger?: React.ReactNode
}

export const SearchAnime = ({ trigger }: SearchAnimeProps) => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        {trigger || (
          <Button size="icon" variant="ghost">
            <Image src={search} alt="search" />{' '}
          </Button>
        )}
      </CredenzaTrigger>
      <CredenzaContent className="w-[100%] md:w-[60%]">
        <CredenzaHeader>
          <CredenzaTitle>
            <Input placeholder="Пошук..." />
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-3 h-[600px]">
          <AnimeCardRowSkeleton />
          <AnimeCardRowSkeleton />
          <AnimeCardRowSkeleton />
          <AnimeCardRowSkeleton />

          {/* <SearchResults /> */}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
