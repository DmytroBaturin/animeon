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
import { AnimeCardRow } from '@/entities/anime'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { debounce } from 'next/dist/server/utils'
import { searchAnime } from '@/shared/api/anime/anime'
import { ResponsePaginatedAnimeList } from '@/shared/api/model'

interface SearchAnimeProps {
  trigger?: React.ReactNode
}

export const SearchAnime = forwardRef<HTMLInputElement, SearchAnimeProps>(
  ({ trigger }: SearchAnimeProps, ref) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResults, setSearchResults] =
      useState<ResponsePaginatedAnimeList>({})
    const [isOpen, setIsOpen] = useState(false) // State to control Credenza visibility

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    }

    const fetchAnime = useCallback(
      debounce((nextValue: string) => {
        let active = true
        searchAnime({ search: nextValue, page_size: 6 })
          .then((data) => {
            if (active) {
              setSearchResults(data.data)
            }
          })
          .catch(() => {
            console.log('Search anime Error')
          })
        return () => {
          active = false
        }
      }, 400),
      [],
    )

    useEffect(() => {
      fetchAnime(searchValue)
    }, [searchValue])

    const handleAnimeClick = () => {
      // Close Credenza when AnimeCardRow is clicked
      setIsOpen(false)
    }

    return (
      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaTrigger asChild>
          {trigger || (
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(true)}>
              <Image src={search} alt="search" />{' '}
            </Button>
          )}
        </CredenzaTrigger>
        <CredenzaContent className="w-[100%] md:top-[30%] h-[40%] md:h-fit md:w-[60%]">
          <div className="flex flex-col gap-4" ref={ref}>
            <CredenzaHeader>
              <CredenzaTitle>
                <Input onChange={handleSearch} placeholder="Пошук..." />
              </CredenzaTitle>
            </CredenzaHeader>
            <CredenzaBody className="flex flex-col gap-3 h-fit">
              {searchResults &&
                searchResults?.results?.map((anime, _) => (
                  <div key={_} onClick={handleAnimeClick}>
                    <AnimeCardRow {...anime} />
                  </div>
                ))}
            </CredenzaBody>
          </div>
        </CredenzaContent>
      </Credenza>
    )
  },
)

SearchAnime.displayName = 'SearchAnime'
