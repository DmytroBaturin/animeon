import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/shared/components/ui/pagination'
import { ResponsePaginatedAnimeList } from '@/shared/api/model'

interface PaginationProps extends ResponsePaginatedAnimeList {
  handlePageChange: (page: number) => void
}

export const generatePaginationItems = ({
  num_pages,
  active_page,
  handlePageChange,
}: PaginationProps) => {
  const items = []

  const totalPagesToShow = 1
  const startPages = 1
  const endPages = 1

  if (num_pages === 1) {
    items.push(
      <PaginationItem key={1}>
        <PaginationLink isActive href="#">
          1
        </PaginationLink>
      </PaginationItem>,
    )
    return items
  }

  for (let i = 1; i <= Math.min(startPages, num_pages!); i++) {
    items.push(
      <PaginationItem key={i}>
        <PaginationLink
          isActive={i === active_page}
          href="#"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  if (active_page! > startPages + 1) {
    items.push(<PaginationEllipsis key="start-ellipsis" />)
  }

  const middleStart = Math.max(active_page! - totalPagesToShow, startPages + 1)
  const middleEnd = Math.min(
    active_page! + totalPagesToShow,
    num_pages! - endPages,
  )

  for (let i = middleStart; i <= middleEnd; i++) {
    items.push(
      <PaginationItem key={i}>
        <PaginationLink
          isActive={i === active_page}
          href="#"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  if (active_page! < num_pages! - endPages - 1) {
    items.push(<PaginationEllipsis key="end-ellipsis" />)
  }

  for (
    let i = Math.max(num_pages! - endPages + 1, middleEnd + 1);
    i <= num_pages!;
    i++
  ) {
    items.push(
      <PaginationItem key={i}>
        <PaginationLink
          isActive={i === active_page}
          href="#"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  return items
}
