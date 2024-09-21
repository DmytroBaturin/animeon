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
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

interface SearchAnimeProps {
  trigger?: React.ReactNode
  handleCloseMenu?: () => void
}

export const SearchAnime = forwardRef<HTMLInputElement, SearchAnimeProps>(
  ({ trigger, handleCloseMenu }: SearchAnimeProps, ref) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
      setPage(1)
      setSearchResults([])
    }

    const fetchAnime = useCallback(
      debounce((nextValue: string, page: number) => {
        let active = true
        searchAnime({ search: nextValue, page_size: 10, page })
          .then((data) => {
            if (active) {
              setSearchResults((prevResults) => [
                ...prevResults,
                ...data.data.results,
              ])
              setHasMore(!!data.data.next)
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
      fetchAnime(searchValue, page)
    }, [searchValue, page])

    const handleAnimeClick = () => {
      setIsOpen(false)
      handleCloseMenu && handleCloseMenu()
    }

    const loadMoreAnime = () => {
      if (hasMore) {
        setPage((prevPage) => prevPage + 1)
      }
    }

    const isItemLoaded = (index: number) => {
      return !!searchResults[index]
    }

    return (
      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaTrigger asChild>
          {trigger || (
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(true)}>
              <Image src={search} alt="search" />
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
            <CredenzaBody className="flex flex-col items-start justify-center gap-3 h-full">
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={
                  hasMore ? searchResults.length + 1 : searchResults.length
                }
                loadMoreItems={loadMoreAnime}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    height={400}
                    itemCount={searchResults.length}
                    itemSize={60}
                    width="100%"
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {({ index, style }) => (
                      <div onClick={handleAnimeClick} style={style}>
                        {searchResults[index] ? (
                          <AnimeCardRow key={index} {...searchResults[index]} />
                        ) : (
                          <div style={{ padding: '10px', textAlign: 'center' }}>
                            Завантаження...
                          </div>
                        )}
                      </div>
                    )}
                  </List>
                )}
              </InfiniteLoader>
              {!hasMore && <p>Немає більше результатів</p>}
            </CredenzaBody>
          </div>
        </CredenzaContent>
      </Credenza>
    )
  },
)

SearchAnime.displayName = 'SearchAnime'
