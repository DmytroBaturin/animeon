'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/components/ui/pagination'
import { ResponsePaginatedAnimeList } from '@/shared/api/model'
import { useRouter, useSearchParams } from 'next/navigation'
import { generatePaginationItems } from '@/features/anime/filter/ui/pagination/generate-pagination-items'

export const PaginationFilter = ({
  active_page,
  num_pages,
  next,
  previous,
}: ResponsePaginatedAnimeList) => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  console.log(active_page, num_pages, next, previous)
  return (
    <Pagination className="items-start justify-start">
      <PaginationContent>
        {previous && (
          <PaginationItem className="hidden sm:flex">
            <PaginationLink
              href="#"
              className="w-full px-4"
              onClick={() => handlePageChange(active_page! - 1)}
            >
              Назад
            </PaginationLink>
          </PaginationItem>
        )}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {generatePaginationItems({ active_page, num_pages, handlePageChange })}
        {next && (
          <PaginationItem className="hidden sm:flex">
            <PaginationLink
              href="#"
              className="w-full px-4"
              onClick={() => handlePageChange(active_page! + 1)}
            >
              Вперед
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
