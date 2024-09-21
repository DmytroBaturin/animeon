import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/shared/components/ui/pagination'
import { ResponsePaginatedAnimeList } from '@/shared/api/model'

export const generatePaginationItems = ({
  num_pages,
  active_page,
  handlePageChange,
}: ResponsePaginatedAnimeList) => {
  const items = []

  const totalPagesToShow = 1
  const startPages = 1 // Показувати завжди перші 3 сторінки
  const endPages = 1 // Показувати завжди останні 3 сторінки

  // Завжди показуємо перші 3 сторінки
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

  // Показуємо еліпсис після перших сторінок, якщо потрібно
  if (active_page! > startPages + 1) {
    items.push(<PaginationEllipsis key="start-ellipsis" />)
  }

  // Визначаємо сторінки навколо поточної сторінки
  const middleStart = Math.max(active_page! - totalPagesToShow, startPages + 1)
  const middleEnd = Math.min(
    active_page! + totalPagesToShow,
    num_pages! - endPages,
  )

  // Показуємо сторінки навколо поточної сторінки
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

  // Показуємо еліпсис перед останніми сторінками, якщо потрібно
  if (active_page! < num_pages! - endPages - 1) {
    items.push(<PaginationEllipsis key="end-ellipsis" />)
  }

  // Завжди показуємо останні 3 сторінки
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
